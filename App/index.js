import React from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';

import Row from './components/Row';
import Button from './components/Button';
// import calculator, {initialState} from './util/calculator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});

export default class App extends React.Component {
  // state = initialState;
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      operator: null,
      previousValue: null,
    };
  }

  setInitialState = () => {
    this.setState({
      currentValue: '0',
      operator: null,
      previousValue: null,
    })
  }

  handleTap = (type, value) => {
    console.log(type,value);
    console.log(state => this.calculator(type, value, state));
    this.setState(state => this.calculator(type, value, state));
  };

  initialState = {
    currentValue: '0',
    operator: null,
    previousValue: null,
  };

  handleNumber = (value, state) => {
    if (state.currentValue === '0') {
      return {currentValue: `${value}`};
    }

    return {
      currentValue: `${state.currentValue}${value}`,
    };
  };

  handleEqual = state => {
    const {currentValue, previousValue, operator} = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = {
      operator: null,
      previousValue: null,
    };

    if (operator === '/') {
      return {
        currentValue: previous / current,
        ...resetState,
      };
    }

    if (operator === '*') {
      return {
        currentValue: previous * current,
        ...resetState,
      };
    }

    if (operator === '+') {
      return {
        currentValue: previous + current,
        ...resetState,
      };
    }

    if (operator === '-') {
      return {
        currentValue: previous - current,
        ...resetState,
      };
    }

    return state;
  };

  calculator = (type, value, state) => {
    switch (type) {
      case 'number':
        return this.handleNumber(value, state);
      case 'operator':
        return {
          operator: value,
          previousValue: state.currentValue,
          currentValue: '0',
        };
      case 'equal':
        return this.handleEqual(state);
      case 'clear':
        return this.setInitialState();
      case 'posneg':
        return {
          currentValue: `${parseFloat(state.currentValue) * -1}`,
        };
      case 'percentage':
        return {
          currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        };
      default:
        return state;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
          <Row>
            <Button
              text="C"
              theme="secondary"
              onPress={() => this.handleTap('clear')}
            />
            <Button
              text="+/-"
              theme="secondary"
              onPress={() => this.handleTap('posneg')}
            />
            <Button
              text="%"
              theme="secondary"
              onPress={() => this.handleTap('percentage')}
            />
            <Button
              text="/"
              theme="accent"
              onPress={() => this.handleTap('operator', '/')}
            />
          </Row>

          <Row>
            <Button text="7" onPress={() => this.handleTap('number', 7)} />
            <Button text="8" onPress={() => this.handleTap('number', 8)} />
            <Button text="9" onPress={() => this.handleTap('number', 9)} />
            <Button
              text="x"
              theme="accent"
              onPress={() => this.handleTap('operator', '*')}
            />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.handleTap('number', 4)} />
            <Button text="5" onPress={() => this.handleTap('number', 5)} />
            <Button text="6" onPress={() => this.handleTap('number', 6)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.handleTap('operator', '-')}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.handleTap('number', 1)} />
            <Button text="2" onPress={() => this.handleTap('number', 2)} />
            <Button text="3" onPress={() => this.handleTap('number', 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.handleTap('operator', '+')}
            />
          </Row>

          <Row>
            <Button
              text="0"
              size="double"
              onPress={() => this.handleTap('number', 0)}
            />
            <Button text="." onPress={() => this.handleTap('number', '.')} />
            <Button
              text="="
              theme="accent"
              onPress={() => this.handleTap('equal')}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}
