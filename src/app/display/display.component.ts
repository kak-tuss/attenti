import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.css"]
})
export class DisplayComponent implements OnInit {
  size: number = 10;
  grid: number[][];

  //Paging vars
  pageSize: number = 50;
  currentPageCol: number = 1;
  currentPageRow: number = 1;
  //visible grid
  displayedGrid: number[][];

  visited: boolean[][];
  counter: number;
  // these are 8 neighbors
  mapRows: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
  mapCols: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];

  constructor() {}

  ngOnInit() {}
  getMaxPage(): number {
    return Math.ceil(this.size / this.pageSize) - 1;
  }
  move(row: number, col: number): void {
    this.currentPageRow += row;
    this.currentPageCol += col;
    // handle overflows
    if (this.currentPageRow < 0) this.currentPageRow = 0;
    if (this.currentPageRow > this.getMaxPage())
      this.currentPageRow = this.getMaxPage();
    if (this.currentPageCol < 0) this.currentPageCol = 0;
    if (this.currentPageCol > this.getMaxPage())
      this.currentPageCol = this.getMaxPage();
  }

  generateGrid() {
    console.log("Generating grid");
    // initializing the array with random pattern
    this.grid = [];
    this.visited = [];
    for (let i: number = 0; i < this.size; i++) {
      this.grid[i] = [];
      this.visited[i] = [];
      for (let j: number = 0; j < this.size; j++) {
        this.grid[i][j] = Math.round(Math.random());
        this.visited[i][j] = false;
      }
    }
    console.log("Done generating grid");
  }

  countIslands(): void {
    this.counter = 0;
    for (let i = 0; i < this.size; ++i) {
      for (let j = 0; j < this.size; ++j) {
        if (this.grid[i][j] > 0 && !this.visited[i][j]) {
          this.mapIsland(i, j);
          ++this.counter;
          console.log(this.counter + ", island found! at " + i + "," + j);
        }
      }
    }
  }

  mapIsland(row: number, col: number): void {
    // Mark cell as visited
    if (this.grid[row][col]) {
      this.grid[row][col] = this.counter + 2;
    }
    this.visited[row][col] = true;
    //Recursion
    for (let k = 0; k < 8; ++k) {
      // if there's land and it wasn't visited yet
      if (this.checkCell(row + this.mapCols[k], col + this.mapRows[k])) {
        this.mapIsland(row + this.mapCols[k], col + this.mapRows[k]);
      }
    }
  }

  checkCell(row: number, col: number): boolean {
    // will return true if cell is land and wasn't visited yet.
    return (
      //range
      row >= 0 &&
      row < this.size &&
      col >= 0 &&
      col < this.size &&
      //land (>0)
      this.grid[row][col] &&
      //still not marked as visited
      !this.visited[row][col]
    );
  }
}
