import React, { useContext, useState } from 'react';
import './App.less';
import AudioPlayer from "./components/audio/AudioPlayer";
import tracks from "./components/audio/tracks";
import { Outlet, Link } from "react-router-dom";
import {
  BarsOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Spin, Modal } from 'antd'

// import avatar from './assets/images/wallhaven-y8wdlx.jpeg'

import { qrKey, qrCreate } from '@/commons/api'
import { LoadingContext } from '@/commons/context'

const AudioMenu: React.FC = () => {
  const loadingContext = useContext(LoadingContext)
  const [qrShow, setQrShow] = useState(false)
  const [qrImg, setQrImg] = useState('')

  async function loginHandle () {
    loadingContext.toggleLoading(true)
    const res = await qrKey()
    if (res.data.code === 200) {
      const res2 = await qrCreate({
        key: res.data.unikey,
        qrimg: '1'
      })
      loadingContext.toggleLoading(false)
      if (res2.data.code === 200) {
        setQrShow(true)
        setQrImg(res2.data.data.qrimg)
      }
    } else {
      loadingContext.toggleLoading(false)
    }
  }

  return (
    <div className='audio_menu'>
      <div className='menu_avatar' onClick={loginHandle}>
        <UserOutlined style={{fontSize: '30px'}} />
        {/* <img src={avatar} alt='avatar' className='avatar'  /> */}
        <p className='username'>未登录</p>
      </div>
      <ul className='menu_list'>
        <li className='list_item'>
          <BarsOutlined style={{ fontSize: '20px' }} />
          <span className='text'>正在播放</span>
        </li>
      </ul>

      <Modal title="网易云扫描二维码登录" visible={qrShow} footer={null}
        transitionName="" maskTransitionName=""
        onCancel={() => {setQrShow(false)}}>
        <img src={qrImg} className="qr_img" />
      </Modal>
    </div>
  )
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  const loadingContextValue = {
    toggleLoading: (val: boolean) => {
      setLoading(val)
    }
  }

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <Spin spinning={loading}>
        <div className="App">
          <AudioMenu></AudioMenu>
          <AudioPlayer tracks={tracks}></AudioPlayer>
          <nav
            style={{
              paddingBottom: "1rem",
            }}
          >
            <Link to="/invoices">Invoices</Link> |{" "}
            <Link to="/expenses">Expenses</Link>
          </nav>
          <Outlet />
        </div>
      </Spin>
    </LoadingContext.Provider>
  );
}

export default App;
