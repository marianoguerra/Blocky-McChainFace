# BlockBook

Codename: [Blocky-McChainFace](https://en.wikipedia.org/wiki/Boaty_McBoatface)

[![Watch the video](https://github.com/marianoguerra/Blocky-McChainFace/raw/master/demo-cover.png)](https://youtu.be/6Jqn4CMwO94)

## High Level Description

A fair price on the second-hand market!

BlockBook helps vehicle owners to prove the vehicle history to get the price they deserve when selling their vehicle.

Using a Blockchain to store mileage and service data, to ensure that customers on the second-hand market get what they pay for.

The mileage information will be tracked and stored on the Blockchain to make it tamper-proof.

The inspection history will also be tracked on the Blockchain, where every inspection will be stored with information about services and changes.

This will guarantee, that a customer on the second-hand market knows exactly what the history of the car is that he wants to buy.

Customers will be much more likely to buy such a car, which has an easily accessible and tamper-proof record.

## Repository Structure

NOTE: lastest commits fake the backend so we can run the frontends in a static
site provider and shut down the servers, see commit history to see communication
with backend-proxy

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

### backend-proxy

A backend API server to proxy between frontends and HyperLedger services.

It also has a websocket proxy to proxy and filter live events from HyperLedger to
frontends.

Technology:

* nodejs
* expressjs
* composer-client

### hyperledger

HyperLedger implementation of Assets, Participants and Transactions

![Architecure](https://github.com/marianoguerra/Blocky-McChainFace/raw/master/assets/architecture.jpeg)

I have set up and configured 5 different droplets (machines) in Digital Ocean.
All the machines are located in Frankfurt.

104.248.43.126 / fabric-ca-server


The Hyperledger Fabric CA is a Certificate Authority (CA) for Hyperledger Fabric.
It provides features such as:
registration of identities, or connects to LDAP as the user registry
issuance of Enrollment Certificates (ECerts)
certificate renewal and revocation

104.248.143.135 full-standalone

This was my test environment. First I deployed all the organizations in this VM using different ports and dockers.

46.101.198.38 tuv-sud

This is the TÜV Süd organization Anchor Peer. It has joined to the ledger for the cars-channel

104.248.32.138 service-atu

This is the TÜV Süd organization Anchor Peer. It has joined to the ledger for the cars-channel

104.248.255.140 orderer

Ordering service provides a shared communication channel to clients and peers, offering a broadcast service for messages containing transactions. Clients connect to the channel and may broadcast messages on the channel which are then delivered to all peers. The channel supports atomic delivery of all messages, that is, message communication with total-order delivery and (implementation specific) reliability.

142.93.99.125 log-book-server

Contains the api rest server that exploses the assets and transactions to be used by certified customers.

### log-share

Abandoned prototype to scan QR codes to trigger transactions on the blockchain
using [expo.io](https://expo.io/)

Technology:

* [expo.io](https://expo.io/)

## Deployment

Servers in DigitalOcean in Frankfurt.

* Ubuntu 18.04 LTS
* nginx as reverse proxy
* Letsencrypt for HTTPS certs
