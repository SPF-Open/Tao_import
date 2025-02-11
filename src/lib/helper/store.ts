import { derived, writable } from 'svelte/store';

export enum TemplateColumn {
  FIN = 'FIN',
  BOSA = 'BOSA',
  OTHER = 'OTHER',
}

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


// Detect any change to template change
followTemplate.subscribe((value) => {
  if (value === TemplateColumn.FIN) {
    titleColumn.set('D');
    promptColumn.set('F');
    correctColumn.set('G');
    rowOffset.set(7);
    alternative.set(4);
  } else if (value === TemplateColumn.BOSA) {
    titleColumn.set('F');
    promptColumn.set('H');
    correctColumn.set('I');
    rowOffset.set(16);
    alternative.set(4);
  }
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


