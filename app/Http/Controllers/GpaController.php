<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\GpaEntry;
use App\Models\User; // Ensure User model is imported

class GpaController extends Controller
{
    public function calculator()
    {
        $user = Auth::user();
        $gpaEntries = $user->gpaEntries()->orderBy('semester')->get();
        $currentGpa = $user->calculateCurrentGpa();

        // Prepare data for GPA progress chart
        $gpaProgressData = $this->getGpaProgressChartData($user);

        return view('gpa.calculator', compact('gpaEntries', 'currentGpa', 'gpaProgressData'));
    }

    public function calculate(Request $request)
    {
        $request->validate([
            'entries' => 'nullable|array',
            'entries.*.course' => 'required|string|max:255',
            'entries.*.grade' => 'required|string|in:A+,A,A-,B+,B,B-,C+,C,C-,D+,D,F',
            'entries.*.credit_hours' => 'required|integer|min:1',
            'entries.*.semester' => 'required|string|max:255',
        ]);

        $totalPoints = 0;
        $totalCredits = 0;
        $calculatedEntries = [];

        if ($request->has('entries')) {
            foreach ($request->entries as $entryData) {
                $gradePoints = GpaEntry::getGradePoints($entryData['grade']);
                $totalPoints += $gradePoints * $entryData['credit_hours'];
                $totalCredits += $entryData['credit_hours'];
                $calculatedEntries[] = [
                    'course' => $entryData['course'],
                    'grade' => $entryData['grade'],
                    'credit_hours' => $entryData['credit_hours'],
                    'semester' => $entryData['semester'],
                    'grade_points' => $gradePoints,
                ];
            }
        }

        $calculatedGpa = $totalCredits > 0 ? round($totalPoints / $totalCredits, 2) : 0;

        return response()->json([
            'gpa' => $calculatedGpa,
            'entries' => $calculatedEntries,
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'entries' => 'required|array',
            'entries.*.course' => 'required|string|max:255',
            'entries.*.grade' => 'required|string|in:A+,A,A-,B+,B,B-,C+,C,C-,D+,D,F',
            'entries.*.credit_hours' => 'required|integer|min:1',
            'entries.*.semester' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        // Clear existing entries for simplicity, or implement update/add logic
        $user->gpaEntries()->delete();

        foreach ($request->entries as $entryData) {
            GpaEntry::create([
                'user_id' => $user->id,
                'course' => $entryData['course'],
                'grade' => $entryData['grade'],
                'credit_hours' => $entryData['credit_hours'],
                'semester' => $entryData['semester'],
                'grade_points' => GpaEntry::getGradePoints($entryData['grade']),
            ]);
        }

        return redirect()->route('gpa.calculator')->with('success', 'GPA entries saved successfully!');
    }

    private function getGpaProgressChartData($user)
    {
        $semesters = $user->gpaEntries()
            ->select('semester')
            ->distinct()
            ->orderBy('semester') // Assuming semesters are sortable strings like "Fall 2023", "Spring 2024"
            ->pluck('semester');

        $gpas = [];
        foreach ($semesters as $semester) {
            $semesterEntries = $user->gpaEntries()->where('semester', $semester)->get();
            $totalPoints = $semesterEntries->sum(function ($entry) {
                return $entry->grade_points * $entry->credit_hours;
            });
            $totalCredits = $semesterEntries->sum('credit_hours');
            $gpas[] = $totalCredits > 0 ? round($totalPoints / $totalCredits, 2) : 0;
        }

        return [
            'labels' => $semesters->toArray(),
            'data' => $gpas,
        ];
    }
}
