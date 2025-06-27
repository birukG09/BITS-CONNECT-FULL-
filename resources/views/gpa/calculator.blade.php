@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card mb-4">
                <div class="card-header">
                    <h4 class="mb-0">
                        <i class="bi bi-calculator me-2"></i>GPA Calculator
                    </h4>
                </div>
                <div class="card-body">
                    @if(session('success'))
                        <div class="alert alert-success">{{ session('success') }}</div>
                    @endif

                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="card text-center bg-primary text-white">
                                <div class="card-body">
                                    <h5 class="card-title">Your Current GPA</h5>
                                    <h1 class="display-3 fw-bold" id="displayGpa">{{ $currentGpa }}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">GPA Progress</div>
                                <div class="card-body">
                                    <canvas id="gpaProgressChart" height="150"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h5 class="mb-3">Course Entries</h5>
                    <form id="gpaForm" action="{{ route('gpa.save') }}" method="POST">
                        @csrf
                        <div id="courseEntries">
                            @forelse($gpaEntries as $index => $entry)
                                <div class="row g-3 mb-3 course-entry">
                                    <div class="col-md-4">
                                        <input type="text" name="entries[{{ $index }}][course]" class="form-control" placeholder="Course Name" value="{{ $entry->course }}" required>
                                    </div>
                                    <div class="col-md-3">
                                        <select name="entries[{{ $index }}][grade]" class="form-select" required>
                                            <option value="">Grade</option>
                                            @foreach(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'] as $grade)
                                                <option value="{{ $grade }}" {{ $entry->grade == $grade ? 'selected' : '' }}>{{ $grade }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" name="entries[{{ $index }}][credit_hours]" class="form-control" placeholder="Credits" value="{{ $entry->credit_hours }}" min="1" required>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="entries[{{ $index }}][semester]" class="form-control" placeholder="Semester (e.g., Fall 2024)" value="{{ $entry->semester }}" required>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-danger remove-entry w-100"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            @empty
                                <div class="row g-3 mb-3 course-entry">
                                    <div class="col-md-4">
                                        <input type="text" name="entries[0][course]" class="form-control" placeholder="Course Name" required>
                                    </div>
                                    <div class="col-md-3">
                                        <select name="entries[0][grade]" class="form-select" required>
                                            <option value="">Grade</option>
                                            <option value="A+">A+</option><option value="A">A</option><option value="A-">A-</option>
                                            <option value="B+">B+</option><option value="B">B</option><option value="B-">B-</option>
                                            <option value="C+">C+</option><option value="C">C</option><option value="C-">C-</option>
                                            <option value="D+">D+</option><option value="D">D</option><option value="F">F</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" name="entries[0][credit_hours]" class="form-control" placeholder="Credits" min="1" required>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="entries[0][semester]" class="form-control" placeholder="Semester (e.g., Fall 2024)" required>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-danger remove-entry w-100" disabled><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            @endforelse
                        </div>

                        <div class="d-flex justify-content-between mt-4">
                            <button type="button" id="addCourseBtn" class="btn btn-outline-secondary">
                                <i class="bi bi-plus-circle me-1"></i>Add Course
                            </button>
                            <div>
                                <button type="button" id="calculateGpaBtn" class="btn btn-info me-2">
                                    <i class="bi bi-arrow-clockwise me-1"></i>Calculate GPA
                                </button>
                                <button type="submit" class="btn btn-success">
                                    <i class="bi bi-save me-1"></i>Save Entries
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        let entryIndex = {{ $gpaEntries->count() > 0 ? $gpaEntries->keys()->last() + 1 : 1 }};

        const courseEntriesDiv = document.getElementById('courseEntries');
        const addCourseBtn = document.getElementById('addCourseBtn');
        const calculateGpaBtn = document.getElementById('calculateGpaBtn');
        const displayGpa = document.getElementById('displayGpa');

        // Function to update remove button states
        function updateRemoveButtons() {
            const removeButtons = document.querySelectorAll('.remove-entry');
            if (removeButtons.length === 1) {
                removeButtons[0].disabled = true;
            } else {
                removeButtons.forEach(btn => btn.disabled = false);
            }
        }

        // Add new course entry row
        addCourseBtn.addEventListener('click', function() {
            const newEntryHtml = `
                <div class="row g-3 mb-3 course-entry">
                    <div class="col-md-4">
                        <input type="text" name="entries[${entryIndex}][course]" class="form-control" placeholder="Course Name" required>
                    </div>
                    <div class="col-md-3">
                        <select name="entries[${entryIndex}][grade]" class="form-select" required>
                            <option value="">Grade</option>
                            <option value="A+">A+</option><option value="A">A</option><option value="A-">A-</option>
                            <option value="B+">B+</option><option value="B">B</option><option value="B-">B-</option>
                            <option value="C+">C+</option><option value="C">C</option><option value="C-">C-</option>
                            <option value="D+">D+</option><option value="D">D</option><option value="F">F</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <input type="number" name="entries[${entryIndex}][credit_hours]" class="form-control" placeholder="Credits" min="1" required>
                    </div>
                    <div class="col-md-2">
                        <input type="text" name="entries[${entryIndex}][semester]" class="form-control" placeholder="Semester (e.g., Fall 2024)" required>
                    </div>
                    <div class="col-md-1">
                        <button type="button" class="btn btn-danger remove-entry w-100"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            `;
            courseEntriesDiv.insertAdjacentHTML('beforeend', newEntryHtml);
            entryIndex++;
            updateRemoveButtons();
        });

        // Remove course entry row (event delegation)
        courseEntriesDiv.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-entry') || event.target.closest('.remove-entry')) {
                const button = event.target.closest('.remove-entry');
                if (document.querySelectorAll('.course-entry').length > 1) {
                    button.closest('.course-entry').remove();
                    updateRemoveButtons();
                }
            }
        });

        // Calculate GPA via AJAX
        calculateGpaBtn.addEventListener('click', function() {
            const formData = new FormData(document.getElementById('gpaForm'));
            const entries = [];
            const courseInputs = document.querySelectorAll('.course-entry');

            courseInputs.forEach((row, idx) => {
                const course = row.querySelector(`[name="entries[${idx}][course]"]`).value;
                const grade = row.querySelector(`[name="entries[${idx}][grade]"]`).value;
                const credit_hours = row.querySelector(`[name="entries[${idx}][credit_hours]"]`).value;
                const semester = row.querySelector(`[name="entries[${idx}][semester]"]`).value;

                if (course && grade && credit_hours && semester) {
                    entries.push({ course, grade, credit_hours, semester });
                }
            });

            fetch('{{ route('gpa.calculate') }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ entries: entries })
            })
            .then(response => response.json())
            .then(data => {
                if (data.gpa !== undefined) {
                    displayGpa.textContent = data.gpa.toFixed(2);
                } else {
                    displayGpa.textContent = 'N/A';
                }
            })
            .catch(error => {
                console.error('Error calculating GPA:', error);
                displayGpa.textContent = 'Error';
            });
        });

        // Initial update of remove buttons
        updateRemoveButtons();

        // GPA Progress Chart
        const gpaProgressCtx = document.getElementById('gpaProgressChart').getContext('2d');
        new Chart(gpaProgressCtx, {
            type: 'line',
            data: {
                labels: {!! json_encode($gpaProgressData['labels']) !!},
                datasets: [{
                    label: 'GPA',
                    data: {!! json_encode($gpaProgressData['data']) !!},
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4.0,
                        title: {
                            display: true,
                            text: 'GPA'
                        }
                    }
                }
            }
        });
    });
</script>
@endpush
