import React from 'react'
import Log from './log/Log'

const MainLogs = ({ logs, position }) => {
  return (
    <div className={`main-logs ${position}`}>
    <h3>Logs</h3>
    <div className='menu-logs'>
        {
          logs.map((log, i) => {
            return (
              <Log key={i} log={log} />
            )
          })
        }
    </div>
</div>
  )
}

export default MainLogs