import React from 'react';
import QRCode from 'qrcode';

class QRCodeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeUrl: '',
    };
  }

  componentDidMount() {
    this.generateQRCode(this.props.link);
  }

  generateQRCode = async (link) => {
    try {
      const qrCodeUrl = await QRCode.toDataURL(link);
      this.setState({ qrCodeUrl });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  render() {
    const { qrCodeUrl } = this.state;

    return (
      <div>
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      </div>
    );
  }
}

export default QRCodeGenerator;
