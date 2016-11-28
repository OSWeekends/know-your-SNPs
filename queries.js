var gql = require('gql');

var queries = {
    redhead: function(adn){
      var isRedhead = gql.atLeast(1, [
        gql.has('rs1805009', 'C'),
        gql.has('rs1805009', 'T'),
        gql.has('rs1805008', 'T'),
        gql.has('rs1805006', 'A')
      ])
      return {
        "description": "Are you redhead?", 
        "value": isRedhead(adn)
      }
    },
    norovirus: function(adn){
        return {
          "description": "Are you inmune to Norovirus?",
          "value": adn.rs601338.genotype == 'AA'
        }
    },
     diabetes: function(adn){
    var hasDiabetes =  gql.atLeast(2, [
    gql.exact('rs17388568', 'AA'),
    gql.exact('rs17388568', 'AG'),]);
    return {
        "description": "are you in risk of developing type-1 diabetes?", 
        "value": hasDiabetes(adn)
      }
    },
    
    gendermale: function(adn){
        var isMale = gql.atLeast(2, [
          gql.exact('rs2032651', 'D'),
          gql.has('rs2032651', 'A'),
          gql.has('rs9341296', 'C'),
          gql.has('rs9341296', 'T'),
          gql.has('rs13304168', 'C'),
          gql.has('rs13304168', 'T'),
          gql.has('rs1118473', 'A'),
          gql.has('rs1118473', 'G'),
          gql.has('rs150173', 'A'),
          gql.has('rs150173', 'C'),
          gql.has('rs16980426', 'G'),
          gql.has('rs16980426', 'T'),
          gql.or([
            gql.exact('rs1558843', 'C'),
            gql.exact('rs1558843', 'A')
          ]),
          gql.or([
            gql.exact('rs17222419', 'C'),
            gql.exact('rs17222419', 'T')
          ])
        ]);
        
        return {
          "description": "Are you a Man?",
          "value": isMale(adn)
        };
    }
}

module.exports = queries;
