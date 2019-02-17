# Create the archive
composer archive create  --sourceType dir --sourceName ../

# Install the archive
composer network install -a logbook.bna -c Serviceatu-peer1PeerAdmin@hlfv1

# Strart the network
composer network start -n logbookv9 -c Serviceatu-peer1PeerAdmin@hlfv1 -V 0.0.1 -A admin -S adminpw

# Use the card generated
composer card import -f admin@logbookv9.card


composer network upgrade -c Serviceatu-peer1PeerAdmin@hlfv1 -V 0.0.3 -n logbookv9
