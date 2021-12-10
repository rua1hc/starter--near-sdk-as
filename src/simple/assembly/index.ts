import { storage, Context, context, u128, PersistentVector, RNG, PersistentMap } from "near-sdk-as"

//========================================//
//---------- 1st game tutorial ----------//
//========================================//

enum gameState {
    INIT,
    GOING,
    ENDED
}

@nearBindgen
export class CRoulette {
    gameID: u32;
    gameState_e: gameState;

    player_s: string;
    guess_b: boolean;
    initAmount_u128: u128;
    betAmount_u128: u128;

    constructor() {
        const rng = new RNG<u32>(1, u32.MAX_VALUE);
        const roll = rng.next();
        this.gameID = roll;
        this.gameState_e = gameState.INIT;

        this.player_s = "None";
        this.guess_b = false;
        this.betAmount_u128 = u128.Zero;
        this.initAmount_u128 = context.attachedDeposit;
    }
}

const games = new PersistentVector<CRoulette>("r");
const gameMap = new PersistentMap<u32, CRoulette>("gr");

export function createGame(): u32 {
    const Roulette_o = new CRoulette();
    // games.push(Roulette_o);

    gameMap.set(Roulette_o.gameID, Roulette_o);
    return Roulette_o.gameID;
}

export function joinGame(_gameID: u32, _guess_b: boolean) {
    const game = gameMap.getSome(_gameID);
    game.guess_b = _guess_b;
    game.betAmount_u128 = context.attachedDeposit;
    gameMap.set(_gameID, game);
}


//========================================//
//-----------  Welcome to Near -----------//
//========================================//

// return the string 'hello world'
export function helloWorld(): string {
    return 'Hi rua1hc to Near!'
}

// return the string 'hello world'
export function Welcome(): string {
    return 'Welcome rua1hc to Near!'
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
