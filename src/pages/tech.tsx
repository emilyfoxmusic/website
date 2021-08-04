import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';

const Tech: React.FC = () => (
  <Layout>
    <SEO title="Emily Fox Music | Tech" />
    <PageHeading>Tech</PageHeading>
    <p>
      I started out using free and open source software because it was what I
      had available, growing up with a Gentoo die-hard as a father (thanks,
      dad!). But it soon became a conscious choice, and when I came to trying my
      hand at music and video production, that was where I naturally went.
    </p>
    <p>
      I have used a few different programs over the years, but I think I'm
      relatively settled on my tooling of choice now.
    </p>
    <p>
      My current toolset is:
      <ul>
        <li>
          <b>Operating system</b>:{' '}
          <TextLink href="https://www.bunsenlabs.org/">BunsenLabs</TextLink> and{' '}
          <TextLink href="https://manjaro.org/">Manjaro</TextLink>
        </li>
        <li>
          <b>Digital Audio Workstation (DAW)</b>:{' '}
          <TextLink href="https://ardour.org/">Ardour</TextLink>
        </li>
        <li>
          <b>Video editor</b>:{' '}
          <TextLink href="https://www.openshot.org/">Openshot</TextLink>
        </li>
        <li>
          <b>Synthesisers</b>:{' '}
          <TextLink href="https://zynaddsubfx.sourceforge.io/">
            ZynAddSubFX
          </TextLink>{' '}
          and <TextLink href="https://tytel.org/helm/">Helm</TextLink>
        </li>
        <li>
          Other notable mentions:
          <ul>
            <li>
              <TextLink href="https://calf-studio-gear.org/">
                Calf studio gear
              </TextLink>
            </li>
            <li>
              <TextLink href="https://qjackctl.sourceforge.io/">
                QjackCtl
              </TextLink>
            </li>
            <li>
              <TextLink href="https://www.gimp.org/">Gimp</TextLink>
            </li>
            <li>
              <TextLink href="https://inkscape.org/">Inkscape</TextLink>
            </li>
          </ul>
        </li>
      </ul>
    </p>
    <p>
      I'm always up for chatting FOSS if you have any questions - come say hi!
    </p>
  </Layout>
);

export default Tech;
