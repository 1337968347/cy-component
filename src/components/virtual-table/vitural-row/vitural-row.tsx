import { Component, Host, h, Prop } from '@stencil/core';
import { createDiff } from '../diff';
import { CellData } from '../interface';

@Component({
  tag: 'vitural-row',
  styleUrl: 'vitural-row.scss',
})
export class VituralRow {
  @Prop() cellsData: CellData[] = [];

  rowsDiff = createDiff<CellData>();

  render() {
    const diffedCellsData = this.rowsDiff.diff(this.cellsData, 'cols');
    return (
      <Host>
        {diffedCellsData.map(cell => (
          <div class="table-cell" style={{ width: cell.position.width + 'px', transform: `translateX(${cell.position.offsetX}px)` }}>
            {cell.data}
          </div>
        ))}
      </Host>
    );
  }
}
