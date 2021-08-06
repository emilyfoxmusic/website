import React, { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ListAction, LIST_REQUEST_ADD } from 'state/songlist/actions';

import {
  Label,
  FormHeading,
  FullWidthInput,
  SecretAdminSection,
  SubmitSongButton,
} from './styles';

const AddSongForm: React.FC = () => {
  const dispatch = useDispatch<Dispatch<ListAction>>();

  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const submit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch({ type: LIST_REQUEST_ADD, payload: { title, artist } });
    setTitle('');
    setArtist('');
  };

  return (
    <SecretAdminSection>
      <FormHeading>Secret admin section</FormHeading>
      <form onSubmit={submit}>
        <Label htmlFor="title">Title</Label>
        <FullWidthInput
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <Label htmlFor="artist">Artist</Label>
        <FullWidthInput
          id="artist"
          type="text"
          value={artist}
          onChange={e => setArtist(e.target.value)}
          required
        />

        <SubmitSongButton type="submit">Add song</SubmitSongButton>
      </form>
    </SecretAdminSection>
  );
};

export default AddSongForm;
