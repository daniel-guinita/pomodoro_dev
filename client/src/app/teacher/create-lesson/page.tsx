import CreateLesson from "@/components/teacher/lesson/add-form";


const CreateLessonPage = () => {
  return (
    <div className="lg:flex lg:items-center lg:flex-col">
      <div className="lg:w-[1000px] lg:py-5 lg:flex lg:flex-col lg:gap-5">
        <div>
          <span className="lg:text-[30px]">Create a New Lesson</span>
        </div>
        <CreateLesson />
      </div>
    </div>
  );
};

export default CreateLessonPage;
