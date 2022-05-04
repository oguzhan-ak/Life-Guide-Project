using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Enums;
using LifeGuideProject.API.ENTITY;
using LifeGuideProject.API.ENTITY.Entities;
using LifeGuideProject.API.ENTITY.ViewModels.ExerciseViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
namespace LifeGuideProject.API.Controllers
{
    [ApiController]
    [Route("api/Exercise")]
    public class ExerciseController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<UserController> _logger;
        LifeGuideDbContext db;

        public ExerciseController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager, ILogger<UserController> logger, LifeGuideDbContext db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
            this.db = db;
        }

        [HttpPost, Route("GetExercises")]
        public async Task<object> GetExercises(ExerciseGetWithDegreeVM exerciseGetWithDegreeVM)
        {
            try
            {
                var allExercises = db.exercises.Where(x => x.videoDegree == exerciseGetWithDegreeVM.degree).OrderBy(x => x.videoTitle).ToList();
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", allExercises));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }

        [HttpPost, Route("Action")]
        public async Task<object> ApplyActionToExercises(UserExerciseVM userExerciseVM)
        {
            try
            {
                var existingDislike = db.userExercises.Where(x => x.action == "begenme" && x.exerciseId == userExerciseVM.exerciseId && x.userEmail == userExerciseVM.userEmail).FirstOrDefault();
                var existingLike = db.userExercises.Where(x => x.action == "begen" && x.exerciseId == userExerciseVM.exerciseId && x.userEmail == userExerciseVM.userEmail).FirstOrDefault();
                var existingIzledim = db.userExercises.Where(x => x.action == "izledim" && x.exerciseId == userExerciseVM.exerciseId && x.userEmail == userExerciseVM.userEmail).FirstOrDefault();
                var existingDevamet = db.userExercises.Where(x => x.action == "izlemedim" && x.exerciseId == userExerciseVM.exerciseId && x.userEmail == userExerciseVM.userEmail).FirstOrDefault();
                if (userExerciseVM.action.Equals("begen"))
                {
                    if (existingDislike != null) // önceden dislike etmiş
                    {
                        db.userExercises.Remove(existingDislike);
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "begen"));
                        var exercise = db.exercises.Where(x => x.id == userExerciseVM.exerciseId).FirstOrDefault();
                        exercise.likedCount = exercise.likedCount + 1;
                        exercise.dislikedCount = exercise.dislikedCount - 1;
                        db.exercises.Update(exercise);
                        db.SaveChanges();

                    }
                    else if (existingLike != null) // önceden like etmiş
                    {
                        db.userExercises.Remove(existingLike);
                        var exercise = db.exercises.Where(x => x.id == userExerciseVM.exerciseId).FirstOrDefault();
                        exercise.likedCount = exercise.likedCount - 1;
                        db.exercises.Update(exercise);
                        db.SaveChanges();
                    }
                    else
                    {
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "begen"));
                        var exercise = db.exercises.Where(x => x.id == userExerciseVM.exerciseId).FirstOrDefault();
                        exercise.likedCount = exercise.likedCount + 1;
                        db.exercises.Update(exercise);
                        db.SaveChanges();
                    }
                }
                else if (userExerciseVM.action.Equals("begenme"))
                {
                    if (existingDislike != null) // önceden dislike etmiş
                    {
                        db.userExercises.Remove(existingDislike);
                        var exercise = db.exercises.Where(x => x.id == userExerciseVM.exerciseId).FirstOrDefault();
                        exercise.dislikedCount = exercise.dislikedCount - 1;
                        db.exercises.Update(exercise);
                        db.SaveChanges();

                    }
                    else if (existingLike != null) // önceden like etmiş
                    {
                        db.userExercises.Remove(existingLike);
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "begenme"));
                        var exercise = db.exercises.Where(x => x.id == userExerciseVM.exerciseId).FirstOrDefault();
                        exercise.likedCount = exercise.likedCount - 1;
                        exercise.dislikedCount = exercise.dislikedCount + 1;
                        db.exercises.Update(exercise);
                        db.SaveChanges();
                    }
                    else // hiçbir şey yapmamış
                    {
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "begenme"));
                        var exercise = db.exercises.Where(x => x.id == userExerciseVM.exerciseId).FirstOrDefault();
                        exercise.dislikedCount = exercise.dislikedCount + 1;
                        db.exercises.Update(exercise);
                        db.SaveChanges();
                    }
                }
                else if (userExerciseVM.action.Equals("izlemedim"))
                {
                    if (existingIzledim != null)
                    {
                        db.userExercises.Remove(existingIzledim);
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "izlemedim"));
                        db.SaveChanges();
                    }
                    else if (existingDevamet != null)
                    {
                        db.userExercises.Remove(existingDevamet);
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "izledim"));
                        db.SaveChanges();
                    }
                    else
                    {
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "izlemedim"));
                        db.SaveChanges();
                    }
                }
                else if (userExerciseVM.action.Equals("izledim"))
                {
                    if (existingDevamet != null)
                    {
                        db.userExercises.Remove(existingDevamet);
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "izledim"));
                        db.SaveChanges();
                    }
                    else if (existingIzledim != null)
                    {
                        db.userExercises.Remove(existingIzledim);
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "izlemedim"));
                        db.SaveChanges();
                    }
                    else
                    {
                        db.userExercises.Add(new UserExercise(userExerciseVM.userEmail, userExerciseVM.exerciseId, "izledim"));
                        db.SaveChanges();
                    }
                }
                else
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Bilinmeyen bir hata ile karşılaşıldı", null));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", null));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }
        [HttpPost, Route("UserActions")]
        public async Task<object> UserActions(UserActionVM userActionVM)
        {
            try
            {
                var userActions = db.userExercises.Where(x => x.userEmail == userActionVM.userEmail).ToList();
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", userActions));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }
    }
}
