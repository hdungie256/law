import './index.scss'
import DialogBox from '../DialogBox'
import DropDown from '../DropDown'
import TextInput from '../TextInput'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import { useState} from 'react';
import DatePick from '../DatePicker'
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useEffect,useRef } from 'react';

const SangCheDialog = (props) => {

  const [nhanhieu, setNhanHieu] = useState("")
  const [nhanhieuEror, setNhanHieuError] = useState("")

  const handleChangeNhanHieu = (e) => {
    setNhanHieu(e.target.value);
  };

  const handleChangeNhanHieuError = (currentNhanHieu) => {
    if (currentNhanHieu.length < 1){
      setNhanHieuError(' ');}
    else{
      setNhanHieuError("")
    }
  };
  

  const [serviceId, setServiceId] = useState("")
  const handleChangeServiceId = (e) => {
    if (e.target.value.toString().length <= 5) {
      setServiceId(e.target.value);
    }
  };

  const [year, setYear] = useState("")
  const handleChangeYear = (e) => {
    if (e.target.value.toString().length <= 4) {
      setYear(e.target.value);
    }
  };

  const [soGCN, setSoGCN] = useState("")
  const handleChangeSoGCN = (e) => {
    setSoGCN(e.target.value);
  };

  const [historyCount, setHistoryCount] = useState(0);
  const [historyKey, setHistoryKey] = useState(0);

  const addHistory = () => {
    setHistoryCount(historyCount + 1);
    setHistoryKey(historyKey + 1)

    setHistoryField((prevHistory) => [
      ...prevHistory,
      {
        key: 'history' + historyKey,
      },
    ]);
    console.log('historyField', historyField)
  };

  const [historyField, setHistoryField] = useState([]);

  const handleDeleteHistory = (historyKey) => {
    const updatedHistory = historyField.filter((item) => item.key !== historyKey);
    setHistoryCount(historyCount - 1);
    setHistoryField(updatedHistory)
  }

  const [action, setAction] = useState("")
  const renderHistory = () => {
    return historyField.map((item) => (
      <div className='history-fields' id={item.key} key={item.key}>
          <div className='history-action'> 
            <DropDown label='Hành động' 
            onChange={setAction}
            value={action}
            options={ ["Thông báo thiếu sót", "Công văn trả lời thông báo thiếu sót","Quyết định chấp nhận hợp lệ","Thông báo từ chối","Công văn trả lời thông báo từ chối","Thông báo cấp GCN","Quyết định từ chối"]}
            className='hisotry-action-dropdown'/> 
          </div>
          <div className='history-date'> <DatePick label='Ngày'/> </div>
          <div className='history-delete'> 
            <IconButton aria-label="delete"  onClick={() => handleDeleteHistory(item.key)}><DeleteIcon /></IconButton>
          </div>
      </div>
    ));
  };
  

  const resetFields = () => {
    setNhanHieu("")
    setNhanHieuError("")
    setServiceId("")
    setYear("")
    setSoGCN("")
    setHistoryCount(0)
    setHistoryField([])
  }

  useEffect(resetFields, [props.isShowing])
  
  const [paperSubmitDate, setPaperSubmitDate] = useState(null)
  const [gcnDate, setGcnDate] = useState(null)

  const paperId = '4-'+ year + '-' + serviceId
  const history = useRef([])

  const getHistory = () => {

    const historyActions = Array.from(document.getElementsByClassName('history-action'))
    .map((element) => {
      return element.querySelectorAll('input')[0].value;
    })
  
    const historyDates = Array.from(document.getElementsByClassName('history-date'))
    .map((element) => {
      return element.querySelectorAll('input')[0].value
    })

    for (let i=0; i<historyActions.length; i++){
    history.current[i] = {
      "action" : historyActions[i],
      "date" : historyDates[i]
    }
    }

    console.log(history.current)
  }

  return (
      <DialogBox className='dialog-box' 
      title={'Tạo đơn sáng chế'} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='500px'
      overflowY={'auto'}
      hr
      handleSave={props.handleSave}
      >
        <div id='sangche-fullname'>
          <TextInput disabled value={props.customerName} errorMessage="" type='text' padding='0px 10px' label='Chủ đơn *' placeholder={('Chủ đơn')} />
        </div>

        <p id="thong-tin-sc"><b style={{color:'#1095e6', fontSize: '17px'}}> Thông tin sáng chế</b></p>
        <div id='sangche-sangche'>
          <TextInput type='text' padding='0px 10px' errorMessage = {nhanhieuEror} onChange={(e) => {handleChangeNhanHieu(e);handleChangeNhanHieuError(e.target.value)}} value={nhanhieu} label='Tên sáng chế *' placeholder={('Tên sáng chế')} />
        </div>
        <div id='sangche-date'>
          <DatePick onChange={(value) => setPaperSubmitDate(value)} value={paperSubmitDate} label='Ngày nộp đơn'/>
          {/* <p style={{color: 'red', position: 'absolute', bottom: '0px'}}> Ngày không hợp lệ</p> */}
        </div>
        <div id='sangche-number'>
          <label id='sangche-number-label'> <b> Số đơn</b></label>
          <div id='sangche-number-group'>
            <TextField placeholder='Nhóm sản phẩm' type="number" disabled value={1}/>
          </div>
          <p id='slash-1'> - </p>
          <div id='sangche-number-year'>
            <TextField placeholder='Năm' type="number" onChange={(e) => handleChangeYear(e)} value={year}/>
          </div>
          <p id='slash-2'> - </p>
          <div id='sangche-number-id'>
            <TextField placeholder='Số đơn' type="number" onChange={(e) => handleChangeServiceId(e)} value={serviceId}/>
          </div>
        </div>
        <div  id='sangche-btn-add-history'> 
          <ButtonSubmit onClick={addHistory} text='Thêm lịch sử'/> 
        </div>
        {renderHistory()}

        <div id='sangche-gcn-block' style={{top: `${470}px`}}>
          <p id="sangche-thong-tin-gcn"><b style={{color:'#1095e6', fontSize : '17px'}}> Thông tin GCN (nếu có) </b></p>
          <div id='sangche-so-gcn'>
              <div style={{'margin-bottom': '7px'}}> 
                <label style={{color: '#6c7a99'}}> <b> Số Giấy chứng nhận</b></label> 
              </div>
              <TextField style={{width: '48%'}}type='text' onChange={(e) => {handleChangeSoGCN(e)}} value={soGCN} placeholder={('Số GCN')} />
          </div>

          <div id='sangche-gcn-date'>
            <DatePick label='Ngày cấp GCN' onChange={(value) => setGcnDate(value)} value={gcnDate}/>
            {/* <p style={{color: 'red', position: 'absolute', bottom: '0px'}}> Ngày không hợp lệ</p> */}
          </div>

          <div id='sangche-button-save'>
            <ButtonSubmit text='Lưu' onClick={async () => {await getHistory(); props.handleSave(props.type, props.customerId, nhanhieu, "", paperId, paperSubmitDate, history.current, soGCN, gcnDate)}}/>
          </div>
          <div id='sangche-button-cancel'>
            <ButtonCancel text='Huỷ' onClick={() => {props.hide()}}/>
          </div>
        </div>
      </DialogBox>
  );
};

export default SangCheDialog;