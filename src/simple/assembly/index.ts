import { storage, Context, context, u128, PersistentVector, RNG, PersistentMap, ContractPromiseBatch } from "near-sdk-as"

//========================================//
//---------- 1st game tutorial -----------//
//========================================//
enum gameState {
    INIT,
    JOINED,
    ENDED
}

@nearBindgen
export class CRoulette {
    gameID: u32;
    gameState_e: gameState;

    guess_b: boolean;
    initAmount_u128: u128;
    betAmount_u128: u128;

    player_s: string;
    winner: string;

    constructor() {
        const rng = new RNG<u32>(1, u32.MAX_VALUE);
        const roll = rng.next();
        this.gameID = roll;
        this.gameState_e = gameState.INIT;

        this.player_s = "None";
        this.winner = context.sender;

        this.guess_b = false;
        this.betAmount_u128 = u128.Zero;
        this.initAmount_u128 = context.attachedDeposit;
    }
}

// const games = new PersistentVector<CRoulette>("r");
const gameMap = new PersistentMap<u32, CRoulette>("r");

export function createGame(): u32 {
    const Roulette_o = new CRoulette();
    // games.push(Roulette_o);

    gameMap.set(Roulette_o.gameID, Roulette_o);
    return Roulette_o.gameID;
}

export function joinGame(_gameID: u32, _guess: boolean): boolean {
    if (context.attachedDeposit == u128.Zero) {
        return false;
    }
    const game = gameMap.getSome(_gameID);
    game.player_s = context.sender;
    game.guess_b = _guess;  // 1-true-even, 0-false-odd
    game.gameState_e = gameState.JOINED;
    game.betAmount_u128 = context.attachedDeposit;
    gameMap.set(_gameID, game);
    return true;
}

export function endGame(_gameID: u32): string {
    const game = gameMap.getSome(_gameID);
    const rng = new RNG<u32>(1, 36); //CRoulette max no is 36
    const rdNo = rng.next();

    if (rdNo % 2 == 1) {
        if (game.guess_b == false) {
            game.winner = game.player_s;
        }
    }
    else {
        if (game.guess_b == true) {
            game.winner = game.player_s;
        }
    }
    game.gameState_e = gameState.ENDED;
    gameMap.set(_gameID, game);

    const to_BENEFICIARY = ContractPromiseBatch.create(game.winner);
    to_BENEFICIARY.transfer(u128.add(game.betAmount_u128, game.initAmount_u128));

    return game.winner;
}

//===========================================//
//-----------  Welcome to Near!!! -----------//
//===========================================//

// return the string 'hello world'
export function helloWorld(): string {
    return 'Hi 0902878570!'
}

// return the string 'hello world'
export function Welcome(): string {
    return 'Welcome 0902878570 to Near!'
}

// read the given key from account (contract) storage
export function read(key: string): string {
    if (storage.hasKey(key)) {
        return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
    } else {
        return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`
    }
}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {
    storage.set(key, value)
    return `✅ Data saved. ( ${storageReport()} )`
}

// private helper method used by read() and write() above
function storageReport(): string {
    return `storage [ ${Context.storageUsage} bytes ]`
}
