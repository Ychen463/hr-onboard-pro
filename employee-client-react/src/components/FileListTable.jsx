import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import {
  InsertDriveFile as FileIcon,
  OpenInNew as OpenInNewIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';

function FileListTable({ files }) {
  const handlePreview = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleDownload = (fileName, fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box style={{ marginTop: '100px' }}>
      <Typography variant="h6">Uploaded Files:</Typography>
      {files.map((file, index) => (
        <Card key={index} style={{ width: 400, marginBottom: '10px' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <FileIcon style={{ marginRight: '10px', color: 'grey' }} />
                <Typography variant="h6">{file.name}</Typography>
              </Box>
              <div>
                <IconButton style={{ color: 'grey' }} onClick={() => handlePreview(file.url)}>
                  <OpenInNewIcon />
                </IconButton>
                <IconButton
                  style={{ color: 'grey' }}
                  onClick={() => handleDownload(file.name, file.url)}
                >
                  <GetAppIcon />
                </IconButton>
              </div>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FileListTable;
