import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBoardSliceInitialState {
  board: string[][];
  current_attempt: {attempt: number; letter_pos: number};
  correct_word: string;
  wordSet: string[];
  letters: {disabled: string[]; almost: string[]; correct: string[]};
  game_over: {gameOver: boolean; guessed: boolean}
}

const initialState: IBoardSliceInitialState = {
  board: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ],
  current_attempt: {attempt: 0, letter_pos: 0},
  correct_word: '',
  wordSet: [],
  letters: {disabled: [], almost: [], correct: []},
  game_over: {gameOver: false, guessed: false},
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset: (state) => {
      state.board = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
      ],
      state.current_attempt = {attempt: 0, letter_pos: 0},
      state.correct_word = '',
      state.wordSet = [],
      state.letters = {disabled: [], almost: [], correct: []},
      state.game_over = {gameOver: false, guessed: false}
    },
    setBoard: (state, action) => {
      state.board = action.payload
    },
    setCurrentAttempt: (state, action: PayloadAction<{attempt: number; letter_pos: number}>) => {
      state.current_attempt = action.payload
    },
    setCorrectWord: (state, action) => {
      state.correct_word = action.payload
    },
    setWordSet: (state, action) => {
      state.wordSet = action.payload
    },
    setLetters: (state, action: PayloadAction<{disabled: string[]; almost: string[]; correct: string[]}>) => {
      if (action.payload.disabled.length) {
        state.letters.disabled.push(...action.payload.disabled);
      }
      if (action.payload.almost.length) {
        state.letters.almost.push(...action.payload.almost);
      }
      if (action.payload.correct.length) {
        state.letters.correct.push(...action.payload.correct);
      }
    },
    setGameOver: (state, action: PayloadAction<{gameOver: boolean; guessed: boolean}>) => {
      state.game_over = action.payload
    }
  }
})

const getBoard = ({ board }: { board: IBoardSliceInitialState }) => board.board

const getCurrentAttempt = ({ board }: { board: IBoardSliceInitialState }) => board.current_attempt

const getCorrectWord = ({ board }: { board: IBoardSliceInitialState }) => board.correct_word

const getWordSet = ({ board }: { board: IBoardSliceInitialState }) => board.wordSet

const getLetters = ({ board }: { board: IBoardSliceInitialState }) => board.letters

const getGameOver = ({ board }: { board: IBoardSliceInitialState }) => board.game_over

export const boardSelector = {
  getBoard,
  getCurrentAttempt,
  getCorrectWord,
  getWordSet,
  getLetters,
  getGameOver
}

export const { actions, reducer } = boardSlice