// import * as contract from "../assembly";
import { u128, VMContext } from "near-sdk-as";
import {
    createGame,
    joinGame
} from "../assembly";

const contract = "rua1hc.testnet";

describe("Game Contract Testing", () => {
    it("create a game", () => {
        VMContext.setAttached_deposit(u128.from('1000000000000000000000000'));
        VMContext.setCurrent_account_id(contract);
        expect(createGame).toBeTruthy();
    })

    it("should join a game", () => {
        VMContext.setAttached_deposit(u128.from('1000000000000000000000000'));
        VMContext.setCurrent_account_id("0902878570.testnet");
        expect(joinGame).toBeTruthy();
    })
})


// describe("Contract", () => {
//     // VIEW method tests

//     it("says hello", () => {
//         expect(contract.helloWorld()).toStrictEqual("hello world")
//     })

//     it("reads data", () => {
//         expect(contract.read("some key")).toStrictEqual("🚫 Key [ some key ] not found in storage. ( storage [ 0 bytes ] )")
//     })

//     // CHANGE method tests

//     it("saves data to contract storage", () => {
//         expect(contract.write("some-key", "some value")).toStrictEqual("✅ Data saved. ( storage [ 18 bytes ] )")
//     })
// })
