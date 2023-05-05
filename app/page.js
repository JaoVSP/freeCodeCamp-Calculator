'use client'
import { useState } from 'react'
import styles from './home.module.sass'

const numbers = [
  { id: 'one', value: 1 },
  { id: 'two', value: 2 },
  { id: 'three', value: 3 },
  { id: 'four', value: 4 },
  { id: 'five', value: 5 },
  { id: 'six', value: 6 },
  { id: 'seven', value: 7 },
  { id: 'eight', value: 8 },
  { id: 'nine', value: 9 },
  { id: 'zero', value: 0 },
]
const operators = [
  { id: 'divide', value: '/' },
  { id: 'multiply', value: '*' },
  { id: 'subtract', value: '-' },
  { id: 'add', value: '+' },
  { id: 'equals', value: '=' },
]

export default function Home() {
  const [currentValue, setCurrentValue] = useState('')
  const [number, setNumber] = useState('')

  const handleOperators = (value) => {
    const newOperator = currentValue + value

    setCurrentValue(newOperator)

    try {
      if (value === '=') {
        const result = eval(currentValue)
        setCurrentValue(result.toString())
        return
      }

      if (
        operators.find((operator) =>
          operator.value.includes(currentValue.slice(-1))
        )
      ) {
        setCurrentValue(currentValue.slice(0, -1) + value)

        if (!currentValue.slice(-1).includes('-') && value === '-') {
          setCurrentValue(newOperator)
        }
        if (
          operators.find((operator) =>
            currentValue.slice(-2, -1).includes(operator.value)
          )
        ) {
          setCurrentValue(currentValue.slice(0, -2) + value)
        }
      }
    } catch (error) {
      console.error(error.message)
      setCurrentValue('Error')
    }

    setNumber('')
  }

  const handleNumber = (value) => {
    const newValue = currentValue + value
    const newNumber = number + value

    try {
      if (newValue.length === 1 && newValue === '0') {
        setCurrentValue('')
        return
      }
      if (currentValue.length >= 26) {
        setCurrentValue('')
        return
      }
    } catch (error) {
      console.error(error.message)
    }

    setNumber(newNumber)
    setCurrentValue(newValue)
  }

  const clear = (value) => {
    if (value === 'AC') {
      setCurrentValue('')
      setNumber('')
    } else {
      setCurrentValue(currentValue.slice(0, -1))
    }
  }

  const decimal = (value) => {
    const decimalValue = currentValue + value
    const newNumber = number + value
    if (!number.includes('.')) {
      setCurrentValue(decimalValue)

      setNumber(newNumber)
    }
    if (number.length === 0) {
      setCurrentValue(currentValue + '0.')
    }
  }

  return (
    <>
      <div className={styles.calculator}>
        <div id="display" className={styles.display}>
          {currentValue || <span>0</span>}
        </div>
        <div className={styles.clear}>
          <button
            id="clear"
            className={styles.clearAllButton}
            onClick={() => clear('AC')}
          >
            AC
          </button>
          <button className={styles.clearButton} onClick={() => clear()}>
            C
          </button>
        </div>

        <div className={styles.numbers}>
          {numbers.map((number) => (
            <button
              id={number.id}
              key={number.id}
              className={styles.numbersButton}
              onClick={() => handleNumber(number.value)}
            >
              {number.value}
            </button>
          ))}
          <button
            id="decimal"
            className={styles.numbersButton}
            onClick={() => decimal('.')}
          >
            .
          </button>
        </div>

        <div className={styles.operators}>
          {operators.map((operator) => (
            <button
              id={operator.id}
              key={operator.id}
              className={styles.operatorsButton}
              onClick={() => handleOperators(operator.value)}
            >
              {operator.value}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
