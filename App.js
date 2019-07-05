import React, { Component } from 'react';

import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

class App extends Component {
  constructor() {
    super();
    this.operations = ['DEL', '+', '-', '*', '/'];
  }
  state = {
    resultText: '',
    calculationText: ''
  };

  calculateResult = () => {
    const text = this.state.resultText;
    // now parse this text ex- 3+3*6^5/2+7
    this.setState({
      calculationText: eval(text)
    });
  };

  validate = () => {
    let text = this.state.resultText;
    console.log(text);
    console.log(typeof text.slice(-1));
    if (this.operations.includes(text.slice(-1))) {
      console.log('I am in');
      return false;
    }
    return true;
  };

  buttonPressed = text => {
    // alert(text);

    if (text == '=') {
      return this.validate() && this.calculateResult();
    }

    this.setState((state, props) => {
      return { resultText: state.resultText + text };
    });
  };

  operate = operation => {
    switch (operation) {
      case 'DEL':
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join('')
        });
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop();

        if (this.operations.indexOf(lastChar) > 0) return;

        if (this.state.resultText == '') return;
        this.setState((state, props) => {
          return {
            resultText: state.resultText + operation
          };
        });
    }
  };

  render() {
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
          key={nums[i][j]}
            style={styles.btn}
            onPress={() => this.buttonPressed(nums[i][j])}
          >
            <Text style={[styles.btnText,{color:"white"}]}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (let i = 0; i < this.operations.length; i++) {
      ops.push(
        <TouchableOpacity
        key={this.operations[i]}
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}
        >
          <Text style={[styles.btnText, { color: 'white' }]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 30
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#444444'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363'
  },
  resultText: {
    fontSize: 30,
    color: 'black'
  },
  calculationText: {
    fontSize: 24,
    color: 'black'
  }
});

export default App;
