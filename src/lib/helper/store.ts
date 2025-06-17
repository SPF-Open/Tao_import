import { derived, writable } from 'svelte/store';

export enum TemplateColumn {
  FIN = 'FIN',
  OLD_BOSA = 'OLD_BOSA',
  OLD_FIN = 'OLD_FIN',
  OTHER = 'OTHER',
}

export const templateList = Object.values(TemplateColumn).map((v, i) => ({
  txt: v,
  selected: i === 0,
  value: v,
}));

export type BindingTemplateDef = {
  column: {
    title: string,
    prompt: string,
    correct?: string,
  },
  row: {
    offset: number,
    alternative: number,
    skipRow: number,
  },
};

export const bindingTemplate: Record<TemplateColumn, BindingTemplateDef> = {
  [TemplateColumn.FIN]: {
    column: {
      title: 'E',
      prompt: 'F',
      correct: undefined,
    },
    row: {
      offset: 17,
      alternative: 4,
      skipRow: 1,
    },
  },
  [TemplateColumn.OLD_BOSA]: {
    column: {
      title: 'F',
      prompt: 'H',
      correct: 'I',
    },
    row: {
      offset: 16,
      alternative: 4,
      skipRow: 0,
    },
  },
  [TemplateColumn.OLD_FIN]: {
    column: {
      title: 'D',
      prompt: 'F',
      correct: 'G',
    },
    row: {
      offset: 7,
      alternative: 4,
      skipRow: 0,
    },
  },
  [TemplateColumn.OTHER]: {
    // Remains unchanged or can be adjusted as needed.
    column: {
      title: null,
      prompt: null,
      correct: null,
    },
    row: {
      offset: null,
      alternative: null,
      skipRow: null,
    },
  },
};

// file input
export const file = writable(null);
export const name = writable('TAO');
export const workbook = writable(null);

// Menu
export const currentSheet = writable('');
export const selectedFormat = writable('');
export const hideAnswer = writable(false);
export const langOutput = writable('FR');

// Column
export const followTemplate = writable<TemplateColumn>(TemplateColumn.FIN);
export const titleColumn = writable("");
export const promptColumn = writable("");
export const correctColumn = writable("");

export const dimensionColumn = writable(undefined);
export const competencyColumn = writable(undefined);
export const indicatorColumn = writable(undefined);

// Row
export const rowOffset = writable(7);
export const alternative = writable(4);
export const skipRow = writable(0);

// Detect any change to template change
followTemplate.subscribe((value) => {
  const v = bindingTemplate[value]
  if(value === TemplateColumn.OTHER) return;
  titleColumn.set(v.column.title);
  promptColumn.set(v.column.prompt);
  correctColumn.set(v.column.correct);
  rowOffset.set(v.row.offset);
  alternative.set(v.row.alternative);
  skipRow.set(v.row.skipRow);
});

// Detect any change to column/row event
export const column_row = derived(
  [titleColumn, promptColumn, correctColumn, rowOffset, alternative],
  ([$titleColumn, $promptColumn, $correctColumn, $rowOffset, $alternative]) => [
    $titleColumn,
    $promptColumn,
    $correctColumn,
    $rowOffset,
    $alternative
  ],
);

// Pdf
export const TaoPreviewBind = writable(null);


