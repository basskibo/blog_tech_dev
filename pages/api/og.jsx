/* eslint-disable react/react-in-jsx-scope */
import { ImageResponse } from '@vercel/og'
// import { NextRequest } from 'next/server'
// import pyramid from '../../public/pyramid.svg'
export const config = {
  runtime: 'experimental-edge'
}

export default async function handler (req) {
  console.log(req)
  const { searchParams } = new URL(req.url)

  // ?title=<title>
  const hasTitle = searchParams.has('title')
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'My default title'
  console.log(title)
  const username = 'basskibo'
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'white',
          backgroundColor: 'black',
          backgroundSize: '150px 150px',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{
          width: '232px',
          height: '180px',
          borderBottom: '1px solid #000',
          overflow: 'hidden'
        }}>
          {/* <div style={{
            position: 'relative',
            overflow: 'hidden',
            // transform: rotate('45deg'), skew('10deg,10deg'),
            borderLeft: '1px solid #000',
            borderTop: '1px solid #000',
            width: '200px',
            height: '200px',
            margin: '81px 0 0 16px'
          }}> */}
            {/* <div style={{
              position: 'absolute',
              width: '200%',
              height: '200%',
              top: '-50%',
              left: '-50%',
              zIndex: '-1',
              background: `url(https://github.com/${username}.png)`,
              backgroundSize: '100%',
              backgroundPosition: 'center top',
              // transform: skew(-10deg,-10deg) rotate(-45deg) ;
              transition: '.3s'
            }}></div> */}
          {/* </div> */}
        </div>
        <img
          width="256"
          height="256"
          src={`https://github.com/${username}.png`}
          style={{
            borderRadius: 128
          }}
        />
        <h1 style={{
          fontSize: 80
        }}>{title}</h1>

        <p style={{
          fontSize: 50,
          color: 'cecece'
        }}>github.com/{username}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
