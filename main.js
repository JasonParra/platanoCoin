const SHA256 = require('crypto-js/sha256')
 
class Transaction{
    constructor(fromAddress, toAddress, amount)
    {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp,transactions,previousHash=""){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce=0
        
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash()
        }
        console.log("block mined: " + this.hash)
    }
}


class Blockchain{
    
    constructor(){
        this.chain=[this.createGenesisBlock()]
        this.difficulty = 2;
        this.pendingTransactions=[];
        this.miningReward=100;
    }

    createGenesisBlock(){
        return new Block(0,"5/12/2019", "Genesis block","0")
    }

    getLeatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("block successfully mined !!!")
        this.chain.push(block)

        this.pendingTransactions=[new Transaction(null, miningRewardAddress, this.miningReward)]
    }

    createTransaction (transaction){
        this.pendingTransactions.push(transaction)
    }

    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLeatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty)
    //     this.chain.push(newBlock)
    // }

    isChainValid(){
        for(let i=1; i< this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousblock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false
            }
            if(currentBlock.previousHash !== previousblock.hash){
                return false
            }
        }   
        return true
    }
}

let platanoCoin = new Blockchain();

//TESTING
// let platanoCoin = new Blockchain();
// console.log("Mining Block 1 .....")
// platanoCoin.addBlock(new Block(1,"5/12/2017"),{amount:4})
// console.log("Mining Block 2 .....")
// platanoCoin.addBlock(new Block(2,"5/12/2017"),{amount:12})

