defmodule UltimatumGame do
  use Xee.ThemeScript
  require Logger

  require_file "scripts/main.exs"
  require_file "scripts/host.exs"
  require_file "scripts/participant.exs"
  require_file "scripts/actions.exs"

  alias Ultimatum.Host
  alias Ultimatum.Participant
  alias Ultimatum.Main
  alias Ultimatum.Actions

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => %{
        page: "waiting",
        game_mode: "ultimatum",
        game_round: 1,
        give_point: 1000,
        participants: %{},
        pairs: %{},
      }
    }}
  end

  def wrap_result({:ok, _} = result), do: result
  def wrap_result(result), do: Main.wrap(result)

  def join(data, id) do
    result = unless Map.has_key?(data.participants, id) do
      new = Main.new_participant()
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
    wrap_result(result)
  end
  
  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Ultimatum Game] #{action} #{params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Host.fetch_contents(data)
      {"MATCH", _} -> Host.match(data)
      {"PREV_PAGE", _} -> Host.prev_page(data)
      {"NEXT_PAGE", _} -> Host.next_page(data)
      {"CHANGE_GAME_ROUND", game_round} -> Host.change_game_round(data, game_round)
      {"CHANGE_GAME_MODE", game_mode} -> Host.change_game_mode(data, game_mode)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Ultimatum Game] #{action} #{params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Participant.fetch_contents(data, id)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end
end
