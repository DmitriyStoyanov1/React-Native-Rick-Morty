import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { useWatchList } from './WatchList.hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: 'white',
      marginTop: theme.spacing(4),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

export function WatchListPage() {
  const classes = useStyles();
  const { items, addItem, removeItem, updateItem } = useWatchList();

  const [watchListItemText, setWatchListItemText] = useState('');

  const handleWatchListItemAdd = () => {
    if (watchListItemText) {
      addItem(watchListItemText);
      setWatchListItemText('');
    }
  };

  const handleWatchListTextInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setWatchListItemText(event.target.value);
  };

  const handleEnterKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleWatchListItemAdd();
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box display="grid" gridTemplateColumns="1fr max-content" gridGap="16px">
        <TextField
          id="outlined-basic"
          label="Text"
          placeholder="Enter watch list item text"
          variant="outlined"
          value={watchListItemText}
          onChange={handleWatchListTextInputChange}
          onKeyPress={handleEnterKeyPress}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={handleWatchListItemAdd}
        >
          Add Item
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" mt="16px">
        {items.map(({ id, isCompleted, text }) => (
          <Box
            key={id}
            display="grid"
            gridTemplateColumns="min-content 1fr max-content"
            gridGap="16px"
          >
            <Checkbox
              checked={isCompleted}
              onChange={() => updateItem({ id, isCompleted: !isCompleted })}
            />
            <TextField
              disabled
              id="outlined-basic"
              variant="outlined"
              value={text}
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={() => removeItem(id)}
            >
              Remove Item
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
