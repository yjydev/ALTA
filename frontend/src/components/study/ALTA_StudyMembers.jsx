import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';

export default function ALTA_StudyMembers() {
  return (
    <>
      {[0, 0, 0, 0, 0, 0].map((v, i) => (
        <ALTA_StudyMemberCard key={i} />
      ))}
    </>
  );
}
