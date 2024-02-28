/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react';

function UploadDropzone({ onFileUpload }) {
  const [highlighted, setHighlighted] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlighted(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHighlighted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlighted(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileUpload(file); // Assuming onFileUpload processes or handles the file
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileUpload(file); // Assuming onFileUpload processes or handles the file
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        border: '2px dashed #aaa',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: highlighted ? '#f0f0f0' : 'inherit',
        cursor: 'pointer',
        width: '50%',
        margin: '0 auto',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*, application/pdf"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <p>Drag and drop your files here or click to select</p>
    </div>
  );
}

export default UploadDropzone;

// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable no-unused-vars */
// import { useState, useRef, useEffect } from 'react';
// // import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
// // import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
// // import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// function UploadDropzone({ onFileUpload }) {
//   const [highlighted, setHighlighted] = useState(false);
//   // const [s3Client, setS3Client] = useState(null); // Define s3Client state variable
//   const fileInputRef = useRef(null);
//   // const { REACT_APP_IDENTITY_POOL_ID } = process.env;
//   // useEffect(() => {
//   //   const initAWS = async () => {
//   //     const client = new S3Client({
//   //       region: 'us-east-2',
//   //       credentials: fromCognitoIdentityPool({
//   //         client: new CognitoIdentityClient({ region: AWS_REGION }),
//   //         identityPoolId: REACT_APP_IDENTITY_POOL_ID,
//   //       }),
//   //     });
//   //     // Set the AWS SDK client in the state
//   //     setS3Client(client);
//   //   };
//   //   initAWS();
//   // }, []);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setHighlighted(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setHighlighted(false);
//   };

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     setHighlighted(false);

//     //   const file = e.dataTransfer.files[0];
//     //   await uploadFileToS3(file);
//     // };

//     const handleFileInput = async () => {
//       const file = e.target.files[0];
//       // await uploadFileToS3(file);
//     };

//     // const uploadFileToS3 = async (file) => {
//     //   try {
//     //     if (!s3Client) return; // Check if s3Client is initialized
//     //     const command = new PutObjectCommand({
//     //       Bucket: AWS_S3_BUCKET_NAME, // Replace with your bucket name
//     //       Key: file.name, // Use the file name as the object key
//     //       ContentType: file.type, // Content type of the file
//     //       Body: file, // File content
//     //     });
//     //     // Execute the PutObjectCommand to upload the file
//     //     const response = await s3Client.send(command);

//     //     // Once upload is successful, construct the URL of the uploaded file
//     //     const uploadedUrl = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;

//     //     // Pass the URL of the uploaded file to the callback function
//     //     onFileUpload(uploadedUrl);

//     //     alert('File uploaded successfully!');
//     //   } catch (error) {
//     //     console.error('Error uploading file:', error);
//     //     alert('Error uploading file');
//     //   }
//     // };

//     const handleClick = () => {
//       fileInputRef.current.click();
//     };

//     return (
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={handleClick}
//         style={{
//           border: '2px dashed #aaa',
//           borderRadius: '5px',
//           padding: '20px',
//           textAlign: 'center',
//           backgroundColor: highlighted ? '#f0f0f0' : 'inherit',
//           cursor: 'pointer',
//           width: '25%',
//           margin: '0 auto',
//         }}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*, application/pdf"
//           onChange={handleFileInput}
//           style={{ display: 'none' }}
//         />
//         <p>Drag and drop your files here or click to select</p>
//       </div>
//     );
//   };
// }

// export default UploadDropzone;
