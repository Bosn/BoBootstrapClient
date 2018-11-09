import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import { RootState } from '@app/state/rootReducer'
import { showMessage, ShowMessageAction, uploadPhoto, RSAAA, clearPhoto } from '@app/state/ducks/shared/actions'
import { connect } from 'react-redux'
import { MSG_TYPE } from '@app/views/components/common/Message'
import { getUploadPhoto } from '@app/state/ducks/shared/selectors'
import { IAsync } from '@app/types'
import Loading from '@app/views/components/common/Loading'
import { AnyAction } from 'redux'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
  },
  dialog: {
  },
  appBar: {
    position: 'relative',
  },
  container: {
    padding: spacing.unit * 2,
  },
  flex: {
    flex: 1,
  },
  margin: {
    margin: spacing.unit * 2,
  },
  button: {
    margin: spacing.unit,
  },
  list: {
    height: '100%',
    overflowY: 'auto',
  },
  title: {
    position: 'absolute',
    left: spacing.unit * 2,
    top: -spacing.unit,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '12px',
    lineHeight: 1,
  },
  canvas: {
    width: 320,
    height: 240,
    marginLeft: spacing.unit * 2,
  },
  video: {
    width: 320,
    height: 240,
  },
  ctl: {
    marginTop: spacing.unit * 2,
  },
  videoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    marginRight: spacing.unit * 2,
  },
  msg: {
    margin: spacing.unit * 2,
  },
})

function Transition(props: Props) {
  return <Slide direction="up" {...props} />
}

interface Props extends WithStyles<typeof styles> {
  open: boolean
  photo: { path: string } & IAsync
  clearPhoto: () => AnyAction
  uploadPhoto: (file: any) => RSAAA
  openHandler: () => void
  closeHandler: () => void
  saveHandler: (path: string) => void
  showMessage: (msg: string, type: MSG_TYPE) => ShowMessageAction
}

interface States {
  canSave: boolean
  blob: Blob | null
}

const CameraUploaderDialog = withStyles(styles)(
  class extends React.Component<Props, States> {

    canvasRef: any
    videoRef: any
    canvasContext: any

    constructor(props: Props) {
      super(props)
      this.state = {
        canSave: false,
        blob: null,
      }
    }

    handleOpen = () => {
      this.props.openHandler()
    }

    handleClose = () => {
      this.props.closeHandler()
    }

    handleSave = () => {
      const photo = this.props.photo
      if (!photo.path) {
        this.props.showMessage('您需要拍照并上传，才能保存。', MSG_TYPE.WARNING)
      } else {
        this.props.saveHandler(photo.path)
      }
    }

    componentDidMount() {
      this.props.clearPhoto()
    }

    capturePhoto = () => {
      const video = this.videoRef
      const canvas = this.canvasRef
      this.canvasContext.drawImage(video, 0, 0, 320, 240)
      const dataURI = canvas.toDataURL('image/png')
      const blob = dataURItoBlob(dataURI)
      this.setState({
        canSave: true,
        blob,
      })
    }

    uploadPhoto = () => {
      this.props.uploadPhoto(this.state.blob)
    }

    setCanvasRef = (ref: any) => {
      this.canvasRef = ref
      const canvas = ref
      this.canvasContext = canvas.getContext('2d')
    }

    setVideoRef = (ref: any) => {
      this.videoRef = ref
      const video = this.videoRef
      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          video.src = window.URL.createObjectURL(stream)
          video.play()
        })
      }
    }

    render() {
      const { classes, open, photo } = this.props
      const { canSave } = this.state
      const { path } = photo
      return (
        <div className={classes.root}>
          <Dialog
            // fullScreen={true}
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
            fullScreen={true}
          >
            <AppBar className={classes.appBar} color="secondary">
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>拍照</Typography>
                <Button color="inherit" onClick={this.handleSave}>保存</Button>
              </Toolbar>
            </AppBar>
            <div className={classes.container}>
              <div className={classes.videoContainer}>
                <video
                  className={classes.video}
                  ref={this.setVideoRef}
                  autoPlay={true}
                  poster="https://cdn.bob.tech/public/image/loading.gif"
                  width="320"
                  height="240"
                />
                <canvas
                  className={classes.canvas}
                  ref={this.setCanvasRef}
                  width="320"
                  height="240"
                />
              </div>
              <div className={classes.ctl}>
                <Button variant="contained" onClick={this.capturePhoto} className={classes.btn}>拍照</Button>
                <Button variant="contained" onClick={this.uploadPhoto} className={classes.btn} disabled={!canSave}>上传</Button>
                <Button variant="contained" color="primary" onClick={this.handleSave} className={classes.btn} disabled={!canSave || !path}>保存</Button>
              </div>
            </div>
            {photo.isFetching && <Loading />}
            {photo.path && <Typography variant="body1" className={classes.msg}>上传成功，请点击右上角保存按钮进行保存。</Typography>}
          </Dialog>
        </div>
      )
    }
  }
)

function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const dw = new DataView(ab)
  for (let i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i))
  }
  return new Blob([ab], { type: mimeString })
}

const mapStateToProps = (state: RootState) => ({
  photo: getUploadPhoto(state),
})

const mapDispatchToProps = ({
  showMessage,
  uploadPhoto,
  clearPhoto,
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraUploaderDialog)
