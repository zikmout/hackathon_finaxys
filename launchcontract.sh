#some important variables
accountName=_full_000

#Start Keys
eris services start keys
echo "Keys started, Please have a look"
eris services ls

#ask for the chainName
echo ""
echo "MAKE sure you have correct yaml file!!!"
echo ""
echo "Please enter the chain name"
read chainName
addr=$(cat $HOME/.eris/chains/$chainName/addresses.csv | grep $chainName$accountName | cut -d ',' -f 1)
echo $addr

#start the chain if it was off
eris chains start $chainName

#Launch Contract!
echo "Launching your Contract tighten your Pants!!!"
eris pkgs do --chain $chainName --address $addr