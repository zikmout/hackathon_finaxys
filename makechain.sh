#some important variables
accountName=_full_000

#Start Keys
eris services start keys
echo "Keys started, Please have a look"
eris services ls

#Ask for chain name and prepare necessary variables
echo "Please enter the Name of your new chain IN LOWER CASE PLEASE!"
read chainName
chain_dir=~/.eris/chains/$chainName/$chainName$accountName
echo $chain_dir

#Start the chain
eris chains make --account-types=Root:2,Full:1 $chainName
eris chains new $chainName --dir $chain_dir
echo "Your Chain is UP and Running have a look"
eris chains ls