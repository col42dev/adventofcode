var puzzleInput = 34000000;

// take ~5 seconds when optimized with -O
var points = Array(count: puzzleInput, repeatedValue: 1)
for elf in 2...points.count {
    for house in (elf-1).stride(to: points.count, by: elf) {
        points[house] += elf*10
    }
    if points[elf-1] >= puzzleInput {
        print("found \(points[elf-1]) at \(elf)")
        break
    }
}


// takes <1 second when optimized with -O
var points2 = Array(count: puzzleInput, repeatedValue: 1)
for elf in 2...points2.count {
    var i = 0
    for house in (elf-1).stride(to: points2.count, by: elf) {
        points2[house] += elf*11
        i += 1
        if i >= 50 { break }
    }
    if points2[elf-1] >= puzzleInput {
        print("found \(points2[elf-1]) at \(elf)")
        break
    }
}