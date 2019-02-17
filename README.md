# BlockBook

Codename: [Blocky-McChainFace](https://en.wikipedia.org/wiki/Boaty_McBoatface)

## High Level Description

A fair price on the second-hand market!

BlockBook helps vehicle owners to prove the vehicle history to get the price they deserve when selling their vehicle.

Using a Blockchain to store mileage and service data, to ensure that customers on the second-hand market get what they pay for.

The mileage information will be tracked and stored on the Blockchain to make it tamper-proof.

The inspection history will also be tracked on the Blockchain, where every inspection will be stored with information about services and changes.

This will guarantee, that a customer on the second-hand market knows exactly what the history of the car is that he wants to buy.

Customers will be much more likely to buy such a car, which has an easily accessible and tamper-proof record.

## Repository Structure

### mobile-fe

Frontend to see car details.

Try it here: https://blockchainlogbook.com/?id=c1

Technology:

* reactjs/redux
* Material UI

### user-ui

Frontend for car owners to schedule services and technical verifications

Try it at: https://blockchainlogbook.com/owner/

username: michael
password: secret

Technology:

* vuejs
* bootstrap

### service-ui

Try it at: https://blockchainlogbook.com/service/

For Service Provider:

username: atu
password: secret

For Technical Verifier:

username: tuv
password: secret

Technology:

* vuejs
* bootstrap

## backend-proxy

A backend API server to proxy between frontends and HyperLedger services.

It also has a websocket proxy to proxy and filter live events from HyperLedger to
frontends.

Technology:

* nodejs
* expressjs
* composer-client

## hyperledger

HyperLedger implementation of Assets, Participants and Transactions

## log-share

Abandoned prototype to scan QR codes to trigger transactions on the blockchain
using [expo.io](https://expo.io/)

Technology:

* [expo.io](https://expo.io/)

