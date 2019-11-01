const 

const votingMenu = _ => {
  inquirer.prompt({
    type: 'input',
    name: 'voter',
    message: 'What is your name?'
  })
    .then(answer => {
      console.log(answer)
      db.query('SELECT * FROM contestants ORDER BY votes', (e, data) => {
        if (e) {
          console.log(e)
        }
        if (data.some(contestant => contestant.name === answer.voter)) {

        } else {
          console.log(`Can't vote until you enter the competition.`)
          start()
        }
      })

    })
    .catch(e => console.log(e))
}


