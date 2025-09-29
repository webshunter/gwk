import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const defaultItems = S.documentTypeListItems().filter(
    (listItem) => listItem.getId() !== 'template'
  )

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .schemaType('template')
        .child(S.documentTypeList('template').title('Pages')),
      S.divider(),
      ...defaultItems,
    ])
}
