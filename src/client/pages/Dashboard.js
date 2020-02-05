import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userUploadAvatar } from '../redux';


function Dashboard({ isLoading, avatar, uploadAvatar }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData);
    uploadAvatar(formData);
  };


  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <img className="profile-avatar" src={`api/profile/avatar/show/${avatar}`} alt="Not found" />
      <form onSubmit={onUpload}>
        <input onChange={handleFileUpload} type="file" name="file" />
        <button onClick={onUpload} type="button">Upload</button>
      </form>
      <p>{isLoading ? 'In Progress' : ''}</p>
    </div>
  );
}

Dashboard.propTypes = {
  avatar: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  uploadAvatar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  avatar: state.user.avatar,
  isLoading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  uploadAvatar: formData => dispatch(userUploadAvatar(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// {
//   "file": {
//       "fieldname": "file",
//       "originalname": "icons8-shopping-cart-64.png",
//       "encoding": "7bit",
//       "mimetype": "image/png",
//       "id": "5e39ca52feb2b13d441db3fa",
//       "filename": "3c6ac807e8c6a3567d112eca6850d62f.png",
//       "metadata": null,
//       "bucketName": "Avatar",
//       "chunkSize": 261120,
//       "size": 794,
//       "md5": "0fd0682862997eb0110906060702b665",
//       "uploadDate": "2020-02-04T19:47:30.750Z",
//       "contentType": "image/png"
//   }
// }
