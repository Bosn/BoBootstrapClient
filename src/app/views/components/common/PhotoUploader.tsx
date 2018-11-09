import config from '@app/../config'
import { getUploadPhoto } from '@app/state/ducks/shared/selectors'
import { RootState } from '@app/state/rootReducer'
import Button from '@material-ui/core/Button'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import React from 'react'
import { connect } from 'react-redux'
import { uploadPhoto } from '@app/state/ducks/shared/actions'
import { CircularProgress } from '@material-ui/core'

const CDN = config.CDN_CONFIG.ROOT

const styles = ({ spacing }: Theme) => createStyles({
  root: {
  },
  btnUpload: {
    margin: spacing.unit,
  },
  inputUpload: {
    display: 'none',
  },
  imgContainer: {
    borderRadius: 5,
    margin: spacing.unit * 2,
  },
  progress: {
    marginLeft: spacing.unit,
    position: 'relative',
    top: spacing.unit,
  },
})

interface Props extends WithStyles<typeof styles> {
  uploadPhoto: (file: any) => any
  hidePhoto?: boolean
  label?: string
  isFetching: boolean
  path: string
  className?: string
}

const PhotoUploader = withStyles(styles)(
  class extends React.Component<Props> {
    public handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault()
      if (!e.target.files) { return }
      const file = e.target.files[0]
      this.props.uploadPhoto(file)
    }

    public render() {
      const { classes, isFetching, path, hidePhoto, label, className } = this.props
      return (
        <div className={className}>
          <input
            id="input-upload-photo"
            accept="image/*"
            className={classes.inputUpload}
            type="file"
            onChange={(e) => this.handleImageChange(e)}
          />
          {path && !hidePhoto ? <div className={classes.imgContainer}><img src={`${CDN}/${path}?x-oss-process=image/resize,w_150`} /></div> : null}
          <label htmlFor="input-upload-photo">
            <Button
              variant="contained"
              component="span"
              size="small"
              color="default"
              className={classes.btnUpload}
              disabled={isFetching}
            >
              {isFetching ? '上传中' :  label || '上传照片'}
              <AddAPhoto />
            </Button>
          </label>
          {isFetching ? <CircularProgress className={classes.progress} size={30} /> : null}
        </div>
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({ ...getUploadPhoto(state) })

const mapDispatchToProps = ({
  uploadPhoto,
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUploader)
