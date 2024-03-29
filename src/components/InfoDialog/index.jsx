import './index.scss'
import DialogBox from '../DialogBox'
import { Accordion, Grid } from '@mui/material';
import {AccordionSummary} from '@mui/material';
import {AccordionDetails} from '@mui/material';
import {Typography} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HistoryTimeline from '../HistoryTimeline';
import dayjs from 'dayjs';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ReplayIcon from '@mui/icons-material/Replay';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const InfoDialog = (props) => {

  return (
      <DialogBox className='dialog-box' 
      title={ 'Số VBBH: ' + (props.workValues[0].gcnId ?  props.workValues[0].gcnId : "chưa có") + ' - Ngày cấp: ' + (props.workValues[0].formattedGcnDate != undefined ? props.workValues[0].formattedGcnDate : "chưa có")} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='80%'
      overflowY={'auto'}
      handleSave={props.handleSave}
      >
    <Accordion defaultExpanded sx={{backgroundColor:'#DAEAF1', boxShadow: 'none', border: '0.25px solid #DAEAF1', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}} >
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
          <PermContactCalendarIcon className='dialog-info-icon'/>
          <Typography className='dialog-info-section'> <b style={{padding: '10px'}}>Thông tin khách hàng</b> </Typography>
        </AccordionSummary>
        <AccordionDetails className='dialog-info-accordion-details'>
          <Typography> <b className='dialog-info-title'> Tên khách hàng: </b> {props.customer.customerName}</Typography>
          <Typography> <b className='dialog-info-title'> Địa chỉ: </b> {props.customer.customerAddress}</Typography>
          <Typography> <b className='dialog-info-title'> Số điện thoại: </b> {props.customer.customerPhoneNumber}</Typography>
          <Typography> <b className='dialog-info-title'> Email: </b> {props.customer.customerEmail}</Typography>
          <br></br>
          <Typography> <b className='dialog-info-title'> Tên người phụ trách: </b> {props.customer.curatorEmail}</Typography>
          <Typography> <b className='dialog-info-title'> Chức danh của người phụ trách: </b> {props.customer.curatorTitle}</Typography>
          <Typography> <b className='dialog-info-title'> Số điện thoại người phụ trách: </b> {props.customer.curatorPhoneNumber}</Typography>
          <Typography> <b className='dialog-info-title'> Email người phụ trách: </b> {props.customer.curatorEmail}</Typography>
        </AccordionDetails>
      </Accordion>

      {props.workValues.map( (item) => 
      <Accordion defaultExpanded sx={{backgroundColor:'#DAEAF1', boxShadow: 'none', border: '0.25px solid #DAEAF1', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}}>
        <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          {item.type.includes('Thẩm định') && <RateReviewIcon className='dialog-info-icon'/>}
          {item.type === 'Sửa đổi' && <ChangeCircleIcon className='dialog-info-icon'/>}
          {item.type === 'Gia hạn' && <MoreTimeIcon className='dialog-info-icon'/>}
          {item.type === 'Cấp lại' && <ReplayIcon className='dialog-info-icon'/>}
          {item.type === 'Li xăng - Chuyển nhượng' && <ManageAccountsIcon className='dialog-info-icon'/>}
          <Typography sx={{width: '100%'}} className='dialog-info-section'> <b style={{width: '100%', padding: '10px'}}> {item.type} - {item.workName ? item.workName : item.name} </b> </Typography>
        </AccordionSummary>
        <AccordionDetails className='dialog-info-accordion-details'>
          <Grid container>
            <Grid item md={6}>
                <Typography> <b className='dialog-info-title'> Số đơn: </b> {item.paperId} </Typography>
            </Grid>
            <Grid item md={6}>
                <Typography> <b className='dialog-info-title'> Ngày nộp đơn: </b> {item.formattedDate ? item.formattedDate : 
                (item.paperSubmitDate ? dayjs(item.paperSubmitDate).format('DD/MM/YYYY') : 'Không có')} </Typography>
            </Grid>
          </Grid>
          {
            item.history && <HistoryTimeline itemArray={item.history}></HistoryTimeline>
        }
        </AccordionDetails>
      </Accordion>
)}
    
      </DialogBox>
  );
};

export default InfoDialog;