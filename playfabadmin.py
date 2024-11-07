import requests
import time
import random
import json
import os
import sys
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()

TITLE_ID = os.getenv('PLAYFAB_TITLE_ID')
SECRET_KEY = os.getenv('PLAYFAB_SECRET_KEY')

if not TITLE_ID or not SECRET_KEY:
    print("[ERROR] PLAYFAB_TITLE_ID and SECRET_KEY must be set in the environment variables.")
    exit(1)

TITLE_ID = TITLE_ID.upper()
print(f"[INFO] TITLE_ID after uppercasing: {TITLE_ID}")

ADMIN_URL = f'https://{TITLE_ID}.playfabapi.com/Admin'
SERVER_URL = f'https://{TITLE_ID}.playfabapi.com/Server'
print(f"[INFO] PlayFab Admin API Base URL: {ADMIN_URL}")
print(f"[INFO] PlayFab Server API Base URL: {SERVER_URL}")

ADMIN_HEADERS = {
    'Content-Type': 'application/json',
    'X-SecretKey': SECRET_KEY
}
SERVER_HEADERS = {
    'Content-Type': 'application/json',
    'X-SecretKey': SECRET_KEY
}
print("[INFO] HTTP Headers set for Admin and Server API requests.")

def generate_unique_id():
    unique_id = ''.join(random.choices('0123456789ABCDEF', k=12))
    print(f"[DEBUG] Generated Unique ID: {unique_id}")
    return unique_id

def get_current_epoch_sec():
    epoch_sec = int(time.time())
    print(f"[DEBUG] Current Local Time (sec since epoch): {epoch_sec}")
    return epoch_sec

def get_server_time():
    url = f"{SERVER_URL}/GetTime"
    payload = {}
    print(f"[INFO] Fetching server time from URL: {url}")
    try:
        response = requests.post(url, headers=SERVER_HEADERS, json=payload)
        print(f"[DEBUG] HTTP POST Request sent to {url}")
        response.raise_for_status()
        data = response.json()
        print(f"[DEBUG] Received Response JSON: {json.dumps(data, indent=2)}")

        server_time_iso = data.get('data', {}).get('Time')
        if server_time_iso:
            server_time_dt = datetime.strptime(server_time_iso, "%Y-%m-%dT%H:%M:%S.%fZ")
            server_time_dt = server_time_dt.replace(tzinfo=timezone.utc)
            server_time_sec = int(server_time_dt.timestamp())
            print(f"[INFO] Server Time (ISO): {server_time_iso}")
            print(f"[INFO] Server Time (sec since epoch): {server_time_sec}")
            return server_time_sec
        else:
            print("[ERROR] 'Time' not found in the response data.")
            return None
    except requests.exceptions.HTTPError as http_err:
        print(f"[ERROR] HTTP error occurred while fetching server time: {http_err}")
        if response.content:
            print(f"[ERROR] Response Content: {response.content.decode()}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"[ERROR] Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"[ERROR] Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"[ERROR] An error occurred during the request: {req_err}")
    except Exception as err:
        print(f"[ERROR] Unexpected error occurred: {err}")
    return None

def get_title_data(keys=None, override_label=None):
    url = f"{ADMIN_URL}/GetTitleData"
    payload = {}
    if keys:
        payload['Keys'] = keys
    if override_label:
        payload['OverrideLabel'] = override_label

    print(f"[INFO] Fetching title data from URL: {url}")
    print(f"[DEBUG] Payload: {json.dumps(payload, indent=2)}")

    try:
        response = requests.post(url, headers=ADMIN_HEADERS, json=payload)
        print(f"[DEBUG] HTTP POST Request sent to {url}")
        response.raise_for_status()
        data = response.json()
        print(f"[DEBUG] Received Response JSON: {json.dumps(data, indent=2)}")

        if data.get('code') == 200:
            title_data = data.get('data', {}).get('Data', {})
            if title_data:
                print("[INFO] Successfully retrieved title data:")
                for key, value in title_data.items():
                    print(f"  - {key}: {value}")
            else:
                print("[WARNING] No title data found.")
            return title_data
        else:
            print(f"[ERROR] Failed to retrieve title data. Status: {data.get('status')}, Error: {data.get('errorMessage')}")
    except requests.exceptions.HTTPError as http_err:
        print(f"[ERROR] HTTP error occurred while fetching title data: {http_err}")
        if response.content:
            print(f"[ERROR] Response Content: {response.content.decode()}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"[ERROR] Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"[ERROR] Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"[ERROR] An error occurred during the request: {req_err}")
    except Exception as err:
        print(f"[ERROR] Unexpected error occurred: {err}")
    return {}  # Return an empty dictionary instead of None

def set_title_data(key, value):
    url = f"{ADMIN_URL}/SetTitleData"
    payload = {
        "Key": key,
        "Value": json.dumps(value) if isinstance(value, (dict, list)) else str(value)
    }
    print(f"[INFO] Setting title data for Key: {key}")
    print(f"[DEBUG] POST URL: {url}")
    print(f"[DEBUG] Payload: {json.dumps(payload, indent=2)}")
    try:
        response = requests.post(url, headers=ADMIN_HEADERS, json=payload)
        print(f"[DEBUG] HTTP POST Request sent to {url}")
        response.raise_for_status()
        print(f"[INFO] Successfully set title data for Key: {key}")
        print(f"[DEBUG] Response Status Code: {response.status_code}")
        print(f"[DEBUG] Response Content: {response.content.decode()}")
    except requests.exceptions.HTTPError as http_err:
        print(f"[ERROR] HTTP error occurred while setting title data: {http_err}")
        if response.content:
            print(f"[ERROR] Response Content: {response.content.decode()}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"[ERROR] Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"[ERROR] Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"[ERROR] An error occurred during the request: {req_err}")
    except Exception as err:
        print(f"[ERROR] Unexpected error occurred: {err}")

def create_game_entry_in_gs(game_created_time_local):
    print("[INFO] Creating a new game entry.")
    game_id = generate_unique_id()
    server_time_sec = get_server_time()
    if server_time_sec is None:
        print("[ERROR] Failed to retrieve server time. Aborting game entry creation.")
        return

    game_start_time = server_time_sec + 60
    print(f"[INFO] Calculated Game Start Time (sec since epoch): {game_start_time}")

    game_data = {
        'S': game_start_time,
        'CL': game_created_time_local,
        'CP': server_time_sec
    }

    existing_games = get_title_data(keys=["GS"])
    gs_data = existing_games.get('GS', "")

    if not gs_data:
        games = {}
    else:
        try:
            games = json.loads(gs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse existing GS data as JSON. Initializing a new games list.")
            games = {}

    games[game_id] = game_data

    print(f"[DEBUG] Updated games list: {json.dumps(games, indent=2)}")

    set_title_data("GS", games)
    print(f"[INFO] Game entry {game_id} stored in 'GS'.")

def get_all_games():
    print("[INFO] Fetching all games under the 'GS' key...")
    title_data = get_title_data(keys=["GS"])
    gs_data = title_data.get("GS", "")

    if gs_data:
        try:
            games = json.loads(gs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse the GS data as JSON.")
            return

        if games:
            print(f"[INFO] Found {len(games)} games:")
            for game_id, game_info in games.items():
                print(f"  - GameID: {game_id}, Data: {json.dumps(game_info, indent=2)}")
        else:
            print("[INFO] No games found under the 'GS' key.")
    else:
        print("[INFO] 'GS' key is empty.")
    print("[INFO] Script execution for fetching all games completed.")

def delete_game(game_id):
    print(f"[INFO] Deleting game with ID: {game_id}")
    title_data = get_title_data(keys=["GS"])

    gs_data = title_data.get("GS", "")

    if gs_data:
        try:
            games = json.loads(gs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse the GS data as JSON.")
            return

        if game_id in games:
            del games[game_id]
            print(f"[INFO] Deleted game with ID: {game_id}")
            set_title_data("GS", games)
        else:
            print(f"[WARNING] Game with ID: {game_id} not found in 'GS'.")
    else:
        print("[INFO] 'GS' key is empty.")

def overwrite_keys_with_empty(keys_to_overwrite):
    print("[INFO] Starting overwrite of specified keys with empty values.")
    for key in keys_to_overwrite:
        print(f"[INFO] Overwriting Key: {key} with empty value.")
        set_title_data(key, "")
    print("[INFO] Overwrite of specified keys completed.")

def delete_all_title_data():
    print("[INFO] Starting deletion of all title data.")
    title_data = get_title_data()
    if title_data is None:
        print("[ERROR] Failed to retrieve title data. Aborting deletion.")
        return

    all_keys = list(title_data.keys())
    if not all_keys:
        print("[WARNING] No title data keys found to delete.")
        return

    print(f"[INFO] Found {len(all_keys)} keys to delete.")
    overwrite_keys_with_empty(all_keys)
    print("[INFO] All title data keys have been overwritten with empty values.")
    print("[INFO] Script execution for 'delete_all' completed.")

def create_result_entry_in_rs(result_data):
    print("[INFO] Creating a new result entry.")

    result_id = generate_unique_id()

    existing_results = get_title_data(keys=["RS"])
    rs_data = existing_results.get('RS', "")

    if not rs_data:
        results = {}
    else:
        try:
            results = json.loads(rs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse existing RS data as JSON. Initializing a new results list.")
            results = {}

    results[result_id] = result_data

    print(f"[DEBUG] Updated results list: {json.dumps(results, indent=2)}")

    set_title_data("RS", results)
    print(f"[INFO] Result entry {result_id} stored in 'RS'.")

def get_all_results():
    print("[INFO] Fetching all results under the 'RS' key...")
    title_data = get_title_data(keys=["RS"])
    rs_data = title_data.get("RS", "")

    if rs_data:
        try:
            results = json.loads(rs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse the RS data as JSON.")
            return

        if results:
            print(f"[INFO] Found {len(results)} results:")
            for result_id, result_info in results.items():
                print(f"  - ResultID: {result_id}, Data: {json.dumps(result_info, indent=2)}")
        else:
            print("[INFO] No results found under the 'RS' key.")
    else:
        print("[INFO] 'RS' key is empty.")
    print("[INFO] Script execution for fetching all results completed.")

def create_bet_entry_in_bs(bet_data):
    print("[INFO] Creating a new bet entry.")

    bet_id = generate_unique_id()

    existing_bets = get_title_data(keys=["BS"])
    bs_data = existing_bets.get('BS', "")

    if not bs_data:
        bets = {}
    else:
        try:
            bets = json.loads(bs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse existing BS data as JSON. Initializing a new bets list.")
            bets = {}

    bets[bet_id] = bet_data

    print(f"[DEBUG] Updated bets list: {json.dumps(bets, indent=2)}")

    set_title_data("BS", bets)
    print(f"[INFO] Bet entry {bet_id} stored in 'BS'.")

def get_all_bets():
    print("[INFO] Fetching all bets under the 'BS' key...")
    title_data = get_title_data(keys=["BS"])
    bs_data = title_data.get("BS", "")

    if bs_data:
        try:
            bets = json.loads(bs_data)
        except json.JSONDecodeError:
            print("[ERROR] Failed to parse the BS data as JSON.")
            return

        if bets:
            print(f"[INFO] Found {len(bets)} bets:")
            for bet_id, bet_info in bets.items():
                print(f"  - BetID: {bet_id}, Data: {json.dumps(bet_info, indent=2)}")
        else:
            print("[INFO] No bets found under the 'BS' key.")
    else:
        print("[INFO] 'BS' key is empty.")
    print("[INFO] Script execution for fetching all bets completed.")

def main():
    if len(sys.argv) < 2:
        print("[ERROR] No action specified. Use 'create_in_gs', 'get_all_games', 'create_in_rs', etc.")
        exit(1)

    action = sys.argv[1].lower()

    if action == 'create_in_gs':
        local_time_sec = get_current_epoch_sec()
        create_game_entry_in_gs(game_created_time_local=local_time_sec)
    elif action == 'get_all_games':
        get_all_games()
    elif action == 'delete_game':
        if len(sys.argv) < 3:
            print("[ERROR] No game_id specified for deletion.")
        else:
            game_id = sys.argv[2]
            delete_game(game_id)
    elif action == 'delete_all':
        delete_all_title_data()
    elif action == 'create_in_rs':
        args = sys.argv[2:]
        result_data = {}
        for arg in args:
            if '=' in arg:
                key, value = arg.split('=')
                key_upper = key.upper()
                if key_upper in ['GAMEID', 'G', 'B1', 'B2', 'B3', 'R1']:
                    if key_upper == 'GAMEID' or key_upper == 'G':
                        result_data['G'] = value  # Always store under 'G'
                    else:
                        result_data[key_upper] = int(value)
                else:
                    print(f"[WARNING] Unrecognized parameter '{key}'.")
            else:
                print(f"[ERROR] Invalid argument format: {arg}")
        if 'G' not in result_data:
            print("[ERROR] 'gameid' or 'g' parameter is required.")
            return
        create_result_entry_in_rs(result_data)
    elif action == 'get_all_results':
        get_all_results()
    elif action == 'create_in_bs':
        args = sys.argv[2:]
        bet_data = {}
        required_keys = {'U', 'G', 'A', 'OU', 'N', 'M'}
        for arg in args:
            if '=' in arg:
                key, value = arg.split('=')
                key_upper = key.upper()
                if key_upper in ['USERID', 'U']:
                    bet_data['U'] = value
                elif key_upper in ['GAMEID', 'G']:
                    bet_data['G'] = value
                elif key_upper in ['A', 'OU', 'N', 'M']:
                    if key_upper == 'A' or key_upper == 'N':
                        bet_data[key_upper] = int(value)
                    elif key_upper == 'M':
                        bet_data[key_upper] = float(value)
                    else:
                        bet_data[key_upper] = value
                else:
                    print(f"[WARNING] Unrecognized parameter '{key}'.")
            else:
                print(f"[ERROR] Invalid argument format: {arg}")

        # Ensure all required keys are present
        missing_keys = required_keys - bet_data.keys()
        if missing_keys:
            print(f"[ERROR] Missing required parameters: {', '.join(missing_keys)}")
            return

        create_bet_entry_in_bs(bet_data)
    elif action == 'get_all_bets':
        get_all_bets()
    else:
        print(f"[ERROR] Unknown action '{action}'.")
        exit(1)

if __name__ == "__main__":
    main()
