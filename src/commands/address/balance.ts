import { NetworkCommand } from '../../base/network'
import { getAddress } from '../../helpers/config'

export default class BalanceCommand extends NetworkCommand {
  static description = `Get the balance for the given address`

  static args = [
    {
      name: 'address',
      required: true,
      description: 'Address or name of a known address',
    },
  ]

  static flags = {
    ...NetworkCommand.flags,
  }

  static examples = ['eth address:balance 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1']

  async run() {
    const { args, flags } = this.parse(BalanceCommand)
    const { address: addressRaw } = args

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { getBalance } = await import('../../helpers/getBalance')
      const address = getAddress(addressRaw)
      const balance = await getBalance(address, networkUrl)

      this.log(balance)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}