import {MatPaginatorIntl} from '@angular/material';

export class MatPaginatorIntlRu extends MatPaginatorIntl {
    itemsPerPageLabel = 'Ед. товара на странице';
    nextPageLabel = 'След. товары';
    previousPageLabel = 'Пред. товары';
    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) {
            return `0 of ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} – ${endIndex} из ${length}`;
    }
}
