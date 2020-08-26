import {BankObject} from '../constants/bank.object'
import {omit} from 'lodash'
export function FindBank(query:string):Promise<any>{
    try {
        const banks = BankObject
        const rows = Object.keys(banks)
        let selected = []
        rows.forEach((row) => {
            let currentbank = banks[row]
            let matched = currentbank.name.match(query)
            if (matched) {
              selected.push(omit(currentbank, ['branches']))
            } else {
              matched = currentbank.kana.match(query)
              if (matched) {
                selected.push(omit(currentbank, ['branches']))
              } else {
                matched = currentbank.hira.match(query)
                if (matched) {
                  selected.push(omit(currentbank, ['branches']))
                }
              }
            }
          })
          return Promise.resolve(selected)
    } catch (error) {
        return Promise.reject(error)
    }
}