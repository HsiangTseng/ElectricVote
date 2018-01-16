class App {
  constructor() {
    this.web3Provider = null;
    this.contracts = {};
  }
  
  async init() {
    this.initView();
    this.initWeb3();
    this.initContract();
    this.bindEvents();
  }
  
  async initView() {
    return new Promise((res, rej) => {
      // Load candidates.
      $.getJSON('../candidates.json', function(data) {
        let candidatesRow = $('#candidatesRow');
        let candidateTemplate = $('#candidateTemplate');
        //
        for (let i = 0; i < data.length; i ++) {
          candidateTemplate.find('.panel-title').text(data[i].name);
          candidateTemplate.find('img').attr('src', data[i].picture);
          candidateTemplate.find('.candidate-age').text(data[i].age);
          candidateTemplate.find('.candidate-policy').text(data[i].policy);
          candidateTemplate.find('.candidate-adopt').attr('data-id', data[i].id);
          //
          candidatesRow.append(candidateTemplate.html());
        }
      });
    })
  }
  
  async initWeb3() {
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(this.web3Provider);
  }
  
  async initContract() {
    return new Promise((res, rej) => {
      $.getJSON('Vote.json', data => {
        this.contracts.Vote = TruffleContract(data);
        this.contracts.Vote.setProvider(this.web3Provider);
      });
    });
  }
  
  bindEvents() {
    $(document).on('click', '.btn-vote', this.handleVote.bind(this));
  }
  
  async handleVote(event) {
    event.preventDefault();
    let id = parseInt($(event.target).data('id'));
    console.log('handleVote', id);
    await this.voteCandidate(id);
  }
  
  async voteCandidate(index) {
    let instance = await this.contracts.Vote.deployed();
    await instance.voteCandidate(index, {from: web3.eth.accounts[0], gas: 100000}); 
  }
  
  async getCurrentVote(index) {
    let instance = await this.contracts.Vote.deployed();
    let voteCount = await instance.getCurrentVote(index);
    return voteCount;
  }
}

var app;

$(function() {
  $(window).load(function() {
    app = new App();
    app.init();
  });
});
