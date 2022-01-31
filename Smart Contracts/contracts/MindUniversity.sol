// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";

import "hardhat/console.sol";

contract MindUniversity is ERC1155, Ownable, ERC1155Supply {
  uint256 public number;
  enum nft {
    COURSE,
    REGISTRATION,
    CERTIFICATE
  }

  constructor() ERC1155("https://biiflg28iijy.usemoralis.com/{id}.json") {
    number = 0;
  }

  address private mContract; //Endereço ERC20 Mindu
  address private mPmt;

  mapping(uint256 => address) private courseOwner;
  mapping(uint256 => uint256) private coursePrice;
  mapping(uint256 => address) private courseStudent;
  mapping(uint256 => uint256) private registrationCourse;
  mapping(uint256 => uint256) private certificateRegistration;
  mapping(uint256 => nft) private nftType;
  mapping(uint256 => uint64) private courseFee;

  /*function transfer_Signature(address _addressCourseOwner, uint256 _val)
    public
  {
    mContract.call(
      abi.encodeWithSignature(
        "transfer(address,uint256)",
        _addressCourseOwner,
        _val
      )
    );
  }
*/
  event CourseCreate(uint256 indexed_id, address _owner, uint256 _price);
  event RegistrationCreate(uint256 indexed_id, address _owner);
  event CertificateCreate(uint256 indexed_id, address _owner);

  modifier onlyInitialized() {
    require(
      mContract != address(0),
      "Please ask the Owner to set Mindu Coin Contract"
    );
    require(
      mPmt != address(0),
      "Please ask the Owner to set Mindu Pmt Address"
    );
    _;
  }

  function setContract(address minduAddress, address paymentAddress)
    public
    onlyOwner
  {
    mContract = minduAddress;
    mPmt = paymentAddress;
  }

  function isCourse(uint256 _courseId) internal view returns (bool _isCourse) {
    if (nftType[_courseId] == nft.COURSE) {
      _isCourse = true;
    } else {
      _isCourse = false;
    }
  }

  function isRegistered(
    uint256 _registrationId,
    uint256 _courseId,
    address _studentAddress
  ) internal view returns (bool _isRegistered) {
    if (
      nftType[_courseId] == nft.COURSE &&
      courseStudent[_registrationId] == _studentAddress &&
      nftType[_registrationId] == nft.REGISTRATION &&
      registrationCourse[_registrationId] == _courseId
    ) {
      _isRegistered = true;
    } else {
      _isRegistered = false;
    }
  }

  function setFee(uint256 _courseId, uint64 _fee)
    public
    onlyOwner
    onlyInitialized
  {
    courseFee[_courseId] = _fee;
  }

  function setPmt(address _mPmt) public onlyOwner onlyInitialized {
    mPmt = _mPmt;
  }

  function setPrice(uint256 _courseId, uint256 _price)
    public
    onlyOwner
    onlyInitialized
  {
    coursePrice[_courseId] = _price;
  }

  function setURI(string memory newuri) public onlyOwner onlyInitialized {
    _setURI(newuri);
  }

  function mint(
    address _account,
    uint256 _price,
    uint64 _courseFee
  ) public onlyOwner onlyInitialized {
    _mint(_account, number, 1, "");
    courseOwner[number] = _account;
    coursePrice[number] = _price;
    courseFee[number] = _courseFee;
    nftType[number] = nft.COURSE;
    emit CourseCreate(number, _account, _price);
    number++;
  }

  function mintRegistration(address _account, uint256 _courseId)
    internal
    onlyInitialized
  {
    require(
      nftType[_courseId] == nft.COURSE,
      "The supplied ID is not a valid Course"
    );
    _mint(_account, number, 1, abi.encodePacked(_courseId));
    courseStudent[number] = _account;
    nftType[number] = nft.REGISTRATION;
    registrationCourse[number] = _courseId;
    emit RegistrationCreate(number, _account);
    number++;
  }

  function mintCertificate(
    address _account,
    uint256 _courseId,
    uint256 _registrationId
  ) public onlyOwner onlyInitialized {
    require(
      nftType[_courseId] == nft.COURSE,
      "The supplied ID is not a valid Course"
    );
    require(
      isRegistered(_registrationId, _courseId, _account),
      "This address is not registered to this Course!"
    );
    _mint(_account, number, 1, "");
    nftType[number] = nft.CERTIFICATE;
    certificateRegistration[number] = _registrationId;
    emit CertificateCreate(number, _account);
    number++;
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal override(ERC1155, ERC1155Supply) {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }

  function pay(
    IERC777 _token,
    address[] memory _recipients,
    uint256[] memory _amounts
  ) internal onlyInitialized {
    for (uint256 i = 0; i < _recipients.length; i++) {
      _token.operatorSend(msg.sender, _recipients[i], _amounts[i], "", "");
    }
  }

  function toUint256(bytes memory _bytes)
    internal
    pure
    returns (uint256 value)
  {
    assembly {
      value := mload(add(_bytes, 0x20))
    }
  }

  /* function tokensReceived(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes calldata userData,
    bytes calldata operatorData
  ) external override(IERC777Recipient) {
    uint256 id_course = toUint256(userData);

    if (amount == coursePrice[id_course]) {
      mintRegistration(from, id_course);
      transfer_Signature(
        courseOwner[id_course],
        (amount * (100 - courseFee[id_course])) / 100
      );
      transfer_Signature(mPmt, (amount * courseFee[id_course]) / 100);
    }
  } */

  function getCourseOwner(uint256 _id) public view returns (address cOwner) {
    cOwner = courseOwner[_id];
    return cOwner;
  }

  function getCourseStudent(uint256 _id)
    public
    view
    returns (address cStudent)
  {
    cStudent = courseStudent[_id];
    return cStudent;
  }

  function getNftType(uint256 _id) public view returns (nft ntype) {
    ntype = nftType[_id];
    return ntype;
  }

  function getCoursePrice(uint256 _id) public view returns (uint256 price) {
    nft a = getNftType(_id);
    require(a == nft.COURSE);
    price = coursePrice[_id];
    return price;
  }

  function register(uint256 id_course, uint256 amount) public onlyInitialized {
    //Estou aqui
    if (
      amount == coursePrice[id_course] && getNftType(id_course) == nft.COURSE
    ) {
      mintRegistration(msg.sender, id_course);

      uint256[] memory _amounts = new uint256[](2);
      address[] memory _recipients = new address[](2);
      _amounts[0] = (amount * (100 - courseFee[id_course])) / 100;
      _amounts[1] = (amount * courseFee[id_course]) / 100;

      _recipients[0] = courseOwner[id_course];
      _recipients[1] = mPmt;

      pay(IERC777(mContract), _recipients, _amounts);
    }
  }
}
