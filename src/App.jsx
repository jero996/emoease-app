// src/App.jsx
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, SmilePlus, Flame, CloudRain } from 'lucide-react';

export default function EmoEaseApp() {
  const [tab, setTab] = useState('journal');
  const [journal, setJournal] = useState('');
  const [entries, setEntries] = useState([]);
  const [bdiScore, setBdiScore] = useState(null);
  const [mbiScore, setMbiScore] = useState(null);
  const [zungScore, setZungScore] = useState(null);

  const bdiQuestions = [
    'Sadness', 'Pessimism', 'Past Failure', 'Loss of Pleasure',
    'Guilty Feelings', 'Punishment Feelings', 'Self-Dislike',
    'Self-Criticalness', 'Suicidal Thoughts or Wishes', 'Crying',
    'Agitation', 'Loss of Interest', 'Indecisiveness', 'Worthlessness',
    'Loss of Energy', 'Changes in Sleeping Pattern', 'Irritability',
    'Changes in Appetite', 'Concentration Difficulty', 'Tiredness or Fatigue', 'Loss of Interest in Sex'
  ];

  const mbiQuestions = [
    'I feel emotionally drained from my work.',
    'I feel used up at the end of the workday.',
    'I feel fatigued when I get up in the morning and have to face another day on the job.',
    'Working with people all day is really a strain for me.',
    'I feel burned out from my work.'
  ];

  const zungQuestions = [
    'I feel more nervous and anxious than usual.',
    'I feel afraid for no reason at all.',
    'I get upset easily or feel panicky.',
    'I feel like I’m falling apart and going to pieces.',
    'I have trouble sleeping at night.'
  ];

  const [bdiResponses, setBdiResponses] = useState(Array(bdiQuestions.length).fill(''));
  const [mbiResponses, setMbiResponses] = useState(Array(mbiQuestions.length).fill(''));
  const [zungResponses, setZungResponses] = useState(Array(zungQuestions.length).fill(''));

  const handleResponseChange = (responses, setter, index, value) => {
    const updated = [...responses];
    const num = parseInt(value);
    updated[index] = isNaN(num) ? '' : num;
    setter(updated);
  };

  const submitJournal = () => {
    if (journal.trim()) {
      setEntries([{ date: new Date().toLocaleDateString(), text: journal }, ...entries]);
      setJournal('');
    }
  };

  const calculateBDI = () => setBdiScore(bdiResponses.reduce((a, b) => a + (parseInt(b) || 0), 0));
  const calculateMBI = () => setMbiScore(mbiResponses.reduce((a, b) => a + (parseInt(b) || 0), 0));
  const calculateZung = () => setZungScore(zungResponses.reduce((a, b) => a + (parseInt(b) || 0), 0));

  const interpretBDI = (score) => {
    if (score < 10) return 'Normal';
    if (score < 20) return 'Mild depression';
    if (score < 30) return 'Moderate depression';
    return 'Severe depression';
  };

  const interpretMBI = (score) => {
    if (score < 15) return 'Low burnout';
    if (score < 30) return 'Moderate burnout';
    return 'High burnout';
  };

  const interpretZung = (score) => {
    if (score < 45) return 'Normal';
    if (score < 60) return 'Mild anxiety';
    if (score < 75) return 'Moderate anxiety';
    return 'Severe anxiety';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700 flex items-center justify-center gap-2">
        <Sparkles className="text-yellow-500" /> EmoEase <SmilePlus className="text-pink-500" />
      </h1>

      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-4">
          <TabsTrigger value="journal">📝 Journal</TabsTrigger>
          <TabsTrigger value="bdi">📘 BDI</TabsTrigger>
          <TabsTrigger value="mbi">🔥 MBI</TabsTrigger>
          <TabsTrigger value="zung">💧 Zung Anxiety</TabsTrigger>
        </TabsList>

        <TabsContent value="journal">
          <Card className="bg-white shadow-md">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Daily Journal</h2>
              <Textarea
                placeholder="How are you feeling today?"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
              />
              <Button className="mt-2" onClick={submitJournal}>Save Entry</Button>
              <div className="mt-4">
                <h3 className="text-md font-semibold">📖 Past Entries</h3>
                {entries.length === 0 ? <p>No entries yet.</p> : entries.map((entry, i) => (
                  <div key={i} className="mb-2 border-b pb-2">
                    <p className="text-sm text-gray-500">{entry.date}</p>
                    <p>{entry.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bdi">
          <Card className="bg-white shadow-md">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Beck Depression Inventory</h2>
              {bdiQuestions.map((q, idx) => (
                <div key={idx} className="mb-2">
                  <label className="block text-sm font-medium mb-1">{q}</label>
                  <Input
                    type="number"
                    min="0"
                    max="3"
                    value={bdiResponses[idx]}
                    onChange={(e) => handleResponseChange(bdiResponses, setBdiResponses, idx, e.target.value)}
                  />
                </div>
              ))}
              <Button className="mt-2" onClick={calculateBDI}>Calculate BDI Score</Button>
              {bdiScore !== null && (
                <p className="mt-2 font-semibold">📘 BDI Score: {bdiScore} – {interpretBDI(bdiScore)}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mbi">
          <Card className="bg-white shadow-md">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Maslach Burnout Inventory</h2>
              {mbiQuestions.map((q, idx) => (
                <div key={idx} className="mb-2">
                  <label className="block text-sm font-medium mb-1">{q}</label>
                  <Input
                    type="number"
                    min="0"
                    max="6"
                    value={mbiResponses[idx]}
                    onChange={(e) => handleResponseChange(mbiResponses, setMbiResponses, idx, e.target.value)}
                  />
                </div>
              ))}
              <Button className="mt-2" onClick={calculateMBI}>Calculate MBI Score</Button>
              {mbiScore !== null && (
                <p className="mt-2 font-semibold">🔥 MBI Score: {mbiScore} – {interpretMBI(mbiScore)}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zung">
          <Card className="bg-white shadow-md">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Zung Self-Rating Anxiety Scale</h2>
              {zungQuestions.map((q, idx) => (
                <div key={idx} className="mb-2">
                  <label className="block text-sm font-medium mb-1">{q}</label>
                  <Input
                    type="number"
                    min="1"
                    max="4"
                    value={zungResponses[idx]}
                    onChange={(e) => handleResponseChange(zungResponses, setZungResponses, idx, e.target.value)}
                  />
                </div>
              ))}
              <Button className="mt-2" onClick={calculateZung}>Calculate Zung Score</Button>
              {zungScore !== null && (
                <p className="mt-2 font-semibold">💧 Zung Score: {zungScore} – {interpretZung(zungScore)}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
