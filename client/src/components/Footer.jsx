import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () =>{
  return (
    <div style={{backgroundColor:'#e8f5e9'}}>
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section style={{width:'100%', bottom:'0'}} className=''>
        <MDBContainer style={{widows:'100%'}} className='text-center text-md-start mt-5'>
          <MDBRow style={{display:'flex', justifyContent:'space-between ', border:'solid 1px grey'}} className='mt-3'>
            <MDBCol style={{paddingLeft:'30px'}} md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Kadamni
              </h4>
              <p>
              The world is changing. Fast. But Khadamni <br />
                freelancers adapt even faster. Whether you’ve already<br />
                gotten on the generative AI train or are still deciding <br />
                 just how far to go, our expert freelancers are here<br />
                 to help you navigate it all.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Products</h4>
              <p>
                <a href='#!' className='text-reset'>
                  Audio-Visual
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Graphic design
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Web/Mobile Development
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Social Media
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Games Development
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Useful links</h4>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol style={{paddingRight:'30px'}} md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Contact</h4>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Tunisia, Tunis 2041, TU
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                khademni@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 216 22 436 723
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 216 50 259 892
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
    </div>
    
  );
}
export default Footer;