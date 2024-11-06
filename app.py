from flask import Flask, render_template, request, jsonify
from game_logic.game import TempleDiceGame

app = Flask(__name__)

# Initialize the game
game = TempleDiceGame()

@app.route('/')
def index():
    return render_template('index.html', game=game)

@app.route('/start_round', methods=['POST'])
def start_round():
    game.start_new_round()
    return jsonify({'status': 'Round started'})

@app.route('/place_bet', methods=['POST'])
def place_bet():
    bet_amount = int(request.json.get('bet_amount', 0))
    success = game.user_place_bet(bet_amount)
    if success:
        return jsonify({'status': 'Bet placed', 'balance': game.user.balance, 'total_pot': game.total_pot})
    else:
        return jsonify({'status': 'Bet failed', 'message': 'Insufficient balance'}), 400

@app.route('/roll_dice', methods=['POST'])
def roll_dice():
    game.roll_dice()
    winner = game.determine_winner()
    return jsonify({
        'user_dice': game.user.current_hand,
        'house_dice': game.house_dice,
        'winner': winner.name,
        'user_balance': game.user.balance,
        'total_pot': game.total_pot,
        'betting_history': game.get_betting_history()
    })

if __name__ == '__main__':
    app.run(debug=True)

