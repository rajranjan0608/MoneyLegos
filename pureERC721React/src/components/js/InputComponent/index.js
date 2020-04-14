import React from 'react';
import dropdownIcon from './dropdown.png';
import crossIcon from './cross.png';
import './style.css';

// eslint-disable-next-line no-unused-vars
const dummyArray = ['mDAI', 'mETH', 'm0x', 'MANA', 'mBTC', 'mUSDT'];

class Input extends React.Component {

  state = {
    showDropdown: false,
    dropdownData: [],
    inputText: '',
    selectedCategory: '',
    searchText:'',
    auxArray: []
  }

  componentDidMount(){
    const {dropdownData} = this.props;
    const arr = dropdownData && dropdownData.length? dropdownData: dummyArray;
    this.setState({dropdownData:arr, auxArray: arr})
  }

  handleClick = () => {
    const {showDropdown} = this.state;
    this.setState({showDropdown: !showDropdown})
  }

  handleChange = (e) => {
    const text = e.target.value;
    if(!isNaN(text)){
      this.setState({inputText:text})
    }
  }

  handleSearch = (e) => {
    const text = e.target.value;
    let {dropdownData} = this.state;
    let auxArray = dropdownData.filter(item=>item.toLowerCase().includes(text.toLowerCase()));
    this.setState({searchText:text, auxArray});
  }

  setCategory = (item) => {
    this.setState({selectedCategory:item});
    this.handleClick();
  }

  dropdownList = () => {
    let {auxArray, searchText} = this.state;
    return (
      <div className='dropdown-container'>
        <div className='dropdown-input'>
          <div className='dropdown-input-div'>
            <input className='input' onChange={this.handleSearch} value={searchText} placeholder="Type a currency or ticket" type="text" />
          </div>
          <div className='dropdown-input-img' onClick={this.handleClick} style={{ cursor:'pointer' }}>
            <img alt='drop' src={crossIcon}/>
          </div>
        </div>
        {auxArray.length?(
        <div className='dropdown-list'>
          <ul className='dropdown-list-ul' style={{ cursor:'pointer' }}>
            {auxArray.map((item,index)=> <li className='dropdown-list-li' key={index}  onClick={()=>this.setCategory(item)} >{item}</li>)}
          </ul>
        </div>):null}
      </div>
    )
  }

  inputForm = () => {
    const {selectedCategory,inputText} = this.state;
    return (
    <div className='input-container'>
      <div className='input-box'>
        <input className='input' onChange={this.handleChange} placeholder={this.props.typeOfInput} type="text" value={inputText} />
      </div>
      <div className='input-button' onClick={this.handleClick} style={{ cursor:'pointer' }}>
      <div className='input-button-text'>
        {selectedCategory.length?selectedCategory:'Select Category...'}
      </div>
      <div className='input-button-img'>
        <img alt='drop' src={dropdownIcon}/>
      </div>
      </div>
    </div>
  )

  }

  render(){
    const {showDropdown} = this.state;
    return (
      <div className='container card shadow  rounded'>
        {!showDropdown? this.inputForm():this.dropdownList()}
      </div>
    );
  }
}

export default Input;
