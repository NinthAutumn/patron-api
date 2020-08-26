import {BankObject} from '../constants/bank.object'
import {omit} from 'lodash'
export function FindShop(query:string,  bank:string):Promise<any>{
    try {
        const banks = BankObject
        let selected = []
      const selectedBank = banks[bank]
      let branchrow = Object.keys(selectedBank.branches)
      branchrow.forEach((row) => {
        const currentrow = selectedBank.branches[row]
        let match = currentrow.name.match(query)
        if (match) {
          selected.push(currentrow)
        } else {
          match = currentrow.kana.match(query)
          if (match) {
            selected.push(currentrow)
          } else {
            match = currentrow.hira.match(query)
            if (match) {
              selected.push(currentrow)
            }
          }
        }
      })
          return Promise.resolve(selected)
    } catch (error) {
        return Promise.reject(error)
    }
}