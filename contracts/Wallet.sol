pragma solidity ^0.4.17;

contract Wallet {
    uint totalSupply;

    struct User {
        bytes32 id;
        uint token;
    }

    struct Admin {
        bytes32 id;
    }

    mapping(bytes32 => User) users;
    mapping(bytes32 => Admin) admins;

    function addUser(bytes32 _id) public {
        users[_id].id = _id;
        users[_id].token = 0;
    }

    function addAdmin(bytes32 _id) public {
        admins[_id].id = _id;
    }

    function addToken(bytes32 _to, uint _value) public {
        users[_to].token += _value;
        totalSupply += _value;
    }

    function subToken(bytes32 _to, uint _value) public {
        users[_to].token -= _value;
        totalSupply -= _value;
    }

    function sendToken(bytes32 _from, bytes32 _to, uint _value) public returns(bool) {
        require(users[_from].token >= _value);

        users[_from].token -= _value;
        users[_to].token += _value;
    }

    function showToken(bytes32 _user) public view returns(uint) {
        return users[_user].token;
    }
}
